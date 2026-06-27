import TextReveal from "./TextReveal";

const Navbar = () => {
  const navLinks = ["Home", "About", "Contact"];

  return (
    <nav className="fixed top-0 left-0 w-full h-[7vh] z-10 flex items-center justify-between px-10 text-[#010101]">
      {/* Name — faster, tighter stagger for a single word feel */}
      <TextReveal
        splitBy="chars"
        duration={0.5}
        ease="power4.out"
        stagger={0.03}
        delay={0}
      >
        <h3 className="text-[1.1rem] font-medium select-none">
          Utkarsh Verma
        </h3>
      </TextReveal>

      {/* Links — staggered delay per item so they cascade left→right */}
      <div className="flex items-center gap-8">
        {navLinks.map((link, i) => (
          <TextReveal
            key={link}
            splitBy="chars"
            duration={0.45}
            ease="power4.out"
            stagger={0.025}
            delay={0.25 + i * 0.06}
            className={"text-[#010101]"}
          >
            <h3 className="text-[1.05rem] text-[#010101] font-normal opacity-80 hover:opacity-100 transition-opacity duration-300 cursor-pointer select-none">
              {link}
            </h3>
          </TextReveal>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
