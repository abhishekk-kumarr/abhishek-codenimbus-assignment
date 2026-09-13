import React, { useState } from 'react';
import { X, CheckCircle2, AlertCircle } from 'lucide-react';

interface ReportProblemModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReportProblemModal: React.FC<ReportProblemModalProps> = ({ isOpen, onClose }) => {
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!category) {
      setError('Please select an issue category.');
      return;
    }
    if (!description.trim()) {
      setError('Please provide a short description of the issue.');
      return;
    }

    setIsSubmitting(true);
    setError('');

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setCategory('');
        setDescription('');
        onClose();
      }, 2000);
    }, 600);
  };

  return (
    <div className="shared-modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div
        className="shared-modal-card p-6 md:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-3xl font-bold text-gray-900 font-manrope">
              Report a Problem
            </h3>
            <p className="text-lg text-gray-500 font-manrope mt-1">
              Help us improve your experience. Let us know what went wrong.
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1"
            aria-label="Close"
          >
            <X size={22} />
          </button>
        </div>

        {isSubmitted ? (
          <div className="py-12 flex flex-col items-center justify-center text-center">
            <CheckCircle2 size={56} className="text-emerald-500 mb-4 animate-bounce" />
            <h4 className="text-2xl font-bold text-gray-800 font-manrope mb-2">
              Thank you for your feedback!
            </h4>
            <p className="text-lg text-gray-600 font-manrope">
              Our engineering team has received your report and will look into it promptly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg text-base">
                <AlertCircle size={18} />
                <span>{error}</span>
              </div>
            )}

            <div>
              <label
                htmlFor="issue-category-select"
                className="block text-base font-semibold text-gray-700 mb-2 font-manrope"
              >
                Issue Category
              </label>
              <select
                id="issue-category-select"
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                  if (error) setError('');
                }}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl text-lg font-manrope focus:outline-none focus:ring-2 focus:ring-[#35004D] focus:border-transparent bg-white"
                required
              >
                <option value="">Choose an issue</option>
                <option value="content">Content or typo error</option>
                <option value="display">Display or layout issue</option>
                <option value="feature">Feature or button not working</option>
                <option value="performance">Audio or slow performance</option>
                <option value="other">Other feedback</option>
              </select>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label
                  htmlFor="issue-description-input"
                  className="text-base font-semibold text-gray-700 font-manrope"
                >
                  Description
                </label>
                <span className="text-sm text-gray-400 font-manrope">
                  {500 - description.length} characters remaining
                </span>
              </div>
              <textarea
                id="issue-description-input"
                rows={4}
                maxLength={500}
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                  if (error) setError('');
                }}
                placeholder="Please describe the problem you encountered in detail..."
                className="w-full px-4 py-3 border border-gray-300 rounded-xl text-lg font-manrope focus:outline-none focus:ring-2 focus:ring-[#35004D] focus:border-transparent resize-none"
                required
              />
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors text-lg font-manrope"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2.5 rounded-xl bg-[#35004D] text-white font-medium hover:bg-[#270038] transition-colors text-lg font-manrope disabled:opacity-50"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Report'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
