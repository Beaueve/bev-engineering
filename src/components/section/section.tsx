import { forwardRef } from "react";

type SectionProps = {
  children: React.ReactNode;
  title: string;
  id: string;
};

const Section = forwardRef<HTMLElement, SectionProps>(
  ({ children, title, id }, ref) => {
    return (
      <section
        ref={ref}
        id={id}
        className="relative h-svh z-50 snap-start flex flex-col justify-center items-center px-4"
      >
        {children}
      </section>
    );
  }
);

Section.displayName = "Section";

export default Section;
