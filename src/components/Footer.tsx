import React, { useState } from 'react';
import { AlertTriangle, Mail, ShieldCheck, X } from 'lucide-react';
import { ReportProblemModal } from './ReportProblemModal';

export const Footer: React.FC = () => {
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);

  return (
    <footer className="shared-footer-main" id="shared-footer" aria-label="Footer">
      <div className="shared-footer-top-section">
        <div className="shared-footer-branding-container">
          <div className="shared-footer-branding-text">
            <span>Wedding</span>
            <span className="footer-categorytype">Invitation</span>
            <span>website by</span>
            <a
              href="https://invitationnation.in"
              target="_blank"
              rel="noopener noreferrer"
              className="shared-footer-brand-name"
            >
              INVITATIONNATION
            </a>
          </div>
        </div>
      </div>

      <div className="shared-footer-bottom-wrapper">
        <div className="shared-footer-container">
          <div className="shared-footer-links-row">
            <button
              type="button"
              className="shared-footer-link"
              id="report-problem-btn"
              onClick={() => setIsReportModalOpen(true)}
            >
              <AlertTriangle size={18} className="text-amber-500" />
              <span>Report a Problem</span>
            </button>

            <a
              href="mailto:support@invitationnation.in"
              className="shared-footer-link"
              id="contact-support-link"
            >
              <Mail size={18} className="text-blue-500" />
              <span>Contact Support</span>
            </a>

            <button
              type="button"
              className="shared-footer-link"
              id="privacy-policy-btn"
              onClick={() => setIsPrivacyModalOpen(true)}
            >
              <ShieldCheck size={18} className="text-emerald-500" />
              <span>Privacy Policy</span>
            </button>
          </div>

          <div className="shared-footer-attribution">
            POWERED BY{' '}
            <a
              href="https://invitationnation.in"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-[#35004D]"
            >
              INVITATION NATION
            </a>
          </div>

          <div className="shared-footer-legal-bar">
            <p className="shared-footer-legal-text">
              © 2026 Invitation Nation. All rights reserved. Crafted with care for your forever.
            </p>
          </div>
        </div>
      </div>

      {/* Report a Problem Modal */}
      <ReportProblemModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
      />

      {/* Privacy Policy Modal */}
      {isPrivacyModalOpen && (
        <div className="shared-modal-overlay" onClick={() => setIsPrivacyModalOpen(false)}>
          <div
            className="shared-modal-card p-6 md:p-8 max-w-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-bold font-manrope text-gray-900">
                Privacy Policy
              </h3>
              <button
                onClick={() => setIsPrivacyModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 p-1"
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </div>
            <div className="text-base text-gray-600 space-y-3 font-manrope max-h-96 overflow-y-auto pr-2">
              <p>
                We respect your personal privacy. When using this wedding celebration website to send wishes or browse event information:
              </p>
              <p>
                <strong>Information Collected:</strong> The name and celebratory message you submit in the wishes form are published solely on the couple's celebration guestbook.
              </p>
              <p>
                <strong>Security:</strong> All submitted wishes and communications are protected against unauthorized access. We do not sell or distribute personal data to third parties.
              </p>
              <p>
                For inquiries regarding data privacy, please reach out to{' '}
                <a href="mailto:support@invitationnation.in" className="text-blue-600 underline">
                  support@invitationnation.in
                </a>.
              </p>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setIsPrivacyModalOpen(false)}
                className="px-5 py-2 bg-[#35004D] text-white rounded-xl font-medium font-manrope hover:bg-[#270038]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
