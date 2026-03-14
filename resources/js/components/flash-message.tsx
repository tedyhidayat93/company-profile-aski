import React from 'react';
import { usePage } from '@inertiajs/react';
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react';

interface FlashMessage {
  success?: string;
  error?: string;
  warning?: string;
  info?: string;
}

interface FlashMessageProps {
  className?: string;
}

export default function FlashMessage({ className = '' }: FlashMessageProps) {
  const { props } = usePage();
  const flash = props.flash as FlashMessage || {};

  const messages = [
    { type: 'success', message: flash.success, icon: CheckCircle, bgColor: 'bg-green-50', textColor: 'text-green-800', borderColor: 'border-green-200' },
    { type: 'error', message: flash.error, icon: XCircle, bgColor: 'bg-red-50', textColor: 'text-red-800', borderColor: 'border-red-200' },
    { type: 'warning', message: flash.warning, icon: AlertCircle, bgColor: 'bg-yellow-50', textColor: 'text-yellow-800', borderColor: 'border-yellow-200' },
    { type: 'info', message: flash.info, icon: Info, bgColor: 'bg-blue-50', textColor: 'text-blue-800', borderColor: 'border-blue-200' },
  ].filter(msg => msg.message);

  if (messages.length === 0) {
    return null;
  }

  return (
    <div className={`fixed top-4 right-4 z-50 space-y-2 ${className}`}>
      {messages.map((msg, index) => {
        const Icon = msg.icon;
        return (
          <div
            key={`${msg.type}-${index}`}
            className={`flex items-center p-4 rounded-lg border ${msg.bgColor} ${msg.textColor} ${msg.borderColor} shadow-lg min-w-[300px] max-w-md animate-in slide-in-from-right-2 fade-in-0 duration-300`}
          >
            <Icon className="h-5 w-5 flex-shrink-0 mr-3" />
            <div className="flex-1 text-sm font-medium">
              {msg.message}
            </div>
            <button
              onClick={() => {
                const element = document.getElementById(`flash-${msg.type}-${index}`);
                if (element) {
                  element.remove();
                }
              }}
              className="ml-3 flex-shrink-0 p-1 rounded-md hover:bg-black/10 transition-colors"
              id={`flash-${msg.type}-${index}`}
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
