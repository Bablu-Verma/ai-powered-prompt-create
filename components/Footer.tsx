import { Brain } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 mt-16">
    
      <div className="border-t border-white/10 py-5">
        <p className="text-center text-sm text-gray-600">
          &copy; {new Date().getFullYear()} ResumeAI. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
