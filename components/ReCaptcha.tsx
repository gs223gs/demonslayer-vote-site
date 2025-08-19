'use client';

import ReCAPTCHA from 'react-google-recaptcha';
import { useRef, forwardRef, useImperativeHandle } from 'react';

interface ReCaptchaProps {
  onVerify: (token: string | null) => void;
  size?: 'compact' | 'normal';
}

export interface ReCaptchaRef {
  reset: () => void;
  execute: () => void;
}

const ReCaptcha = forwardRef<ReCaptchaRef, ReCaptchaProps>(
  ({ onVerify, size = 'normal' }, ref) => {
    const recaptchaRef = useRef<ReCAPTCHA>(null);
    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

    useImperativeHandle(ref, () => ({
      reset: () => {
        recaptchaRef.current?.reset();
      },
      execute: () => {
        recaptchaRef.current?.execute();
      }
    }));

    if (!siteKey) {
      console.warn('ReCAPTCHA site key not found in environment variables');
      return (
        <div className="text-red-500 text-sm">
          ReCAPTCHA設定エラー
        </div>
      );
    }

    const handleChange = (token: string | null) => {
      onVerify(token);
    };

    const handleExpired = () => {
      onVerify(null);
    };

    const handleError = () => {
      onVerify(null);
    };

    return (
      <div className="flex justify-center my-4">
        <ReCAPTCHA
          ref={recaptchaRef}
          sitekey={siteKey}
          onChange={handleChange}
          onExpired={handleExpired}
          onError={handleError}
          size={size}
          theme="light"
        />
      </div>
    );
  }
);

ReCaptcha.displayName = 'ReCaptcha';

export { ReCaptcha };