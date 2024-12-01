'use client';

import { FormEvent, useState } from 'react';

export default function BankApplicationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = {
      firstName: (e.currentTarget.elements.namedItem('firstName') as HTMLInputElement).value,
      lastName: (e.currentTarget.elements.namedItem('lastName') as HTMLInputElement).value,
      addressLine1: (e.currentTarget.elements.namedItem('addressLine1') as HTMLInputElement).value,
      city: (e.currentTarget.elements.namedItem('city') as HTMLInputElement).value,
      state: (e.currentTarget.elements.namedItem('state') as HTMLInputElement).value,
      country: 'US'
    };

    try {
      const response = await fetch('/api/submit-application', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Submission failed');
      alert('Application submitted successfully!');
    } catch (error) {
      alert('Failed to submit application');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          required
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          required
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <input
          type="text"
          name="addressLine1"
          placeholder="Address Line 1"
          required
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <input
          type="text"
          name="city"
          placeholder="City"
          required
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <input
          type="text"
          name="state"
          placeholder="State"
          required
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <input
          type="text"
          value="US"
          disabled
          className="w-full p-2 border rounded bg-gray-100"
        />
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full p-2 text-white bg-blue-500 rounded hover:bg-blue-600 disabled:bg-blue-300"
      >
        {isSubmitting ? 'Submitting...' : 'Submit Application'}
      </button>
    </form>
  );
}