import { useState } from 'react';

import { Button, Modal } from '../../../components/shared';
import { getApiErrorMessage } from '../../../utils/getApiErrorMessage';
import { useCreateDepot } from '../api/useCreateDepot';
import { useGeocodeAddress, type GeocodeResult } from '../api/useGeocodeAddress';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateDepotModal({ isOpen, onClose }: Props) {
  const createDepot = useCreateDepot();
  const geocodeAddress = useGeocodeAddress();

  const [city, setCity] = useState('');
  const [street, setStreet] = useState('');
  const [foundLocation, setFoundLocation] = useState<GeocodeResult | null>(null);

  const reset = () => {
    setCity('');
    setStreet('');
    setFoundLocation(null);
    geocodeAddress.reset();
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  // Any edit after a successful find invalidates it — the confirmed
  // coordinates belonged to whatever text was in the fields at the time.
  const withReset = (setter: (value: string) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setter(e.target.value);
    if (foundLocation) setFoundLocation(null);
    geocodeAddress.reset();
  };

  const handleFindLocation = () => {
    const address = `${street.trim()}, ${city.trim()}`;
    geocodeAddress.mutate(address, {
      onSuccess: (result) => setFoundLocation(result),
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!foundLocation) return;
    createDepot.mutate(
      {
        address: foundLocation.formatted_address,
        latitude: foundLocation.latitude,
        longitude: foundLocation.longitude,
      },
      { onSuccess: handleClose },
    );
  };

  const canFind = city.trim().length > 0 && street.trim().length > 0 && !geocodeAddress.isPending;

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="New Depot"
      footer={
        <>
          <Button variant="secondary" onClick={handleClose} type="button">Cancel</Button>
          <Button
            type="submit"
            form="create-depot-form"
            disabled={!foundLocation || createDepot.isPending}
          >
            {createDepot.isPending ? 'Creating...' : 'Create'}
          </Button>
        </>
      }
    >
      {createDepot.isError && (
        <div className="form-error">
          {getApiErrorMessage(createDepot.error, 'Failed to create depot.')}
        </div>
      )}
      <form id="create-depot-form" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="dep-city">City *</label>
          <input id="dep-city" required value={city} onChange={withReset(setCity)} />
        </div>
        <div className="field">
          <label htmlFor="dep-street">Street and building *</label>
          <input id="dep-street" required value={street} onChange={withReset(setStreet)} />
        </div>

        <Button
          type="button"
          variant="secondary"
          onClick={handleFindLocation}
          disabled={!canFind}
        >
          {geocodeAddress.isPending ? 'Searching…' : 'Find location'}
        </Button>

        {geocodeAddress.isError && (
          <p className="text-sm text-danger mt-2">
            {getApiErrorMessage(geocodeAddress.error, "Couldn't find that address.")}
          </p>
        )}

        {foundLocation && (
          <p className="text-sm text-primary-light mt-2 flex items-start gap-1.5">
            <span>✓</span>
            <span>Location found: {foundLocation.formatted_address}</span>
          </p>
        )}
      </form>
    </Modal>
  );
}
