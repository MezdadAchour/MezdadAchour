// src/components/ui/section-title.tsx
interface SectionTitleProps {
    title: string;
    subtitle?: string;
  }
  
  export function SectionTitle({ title, subtitle }: SectionTitleProps) {
    return (
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent inline-block">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
            {subtitle}
          </p>
        )}
      </div>
    );
  }
  