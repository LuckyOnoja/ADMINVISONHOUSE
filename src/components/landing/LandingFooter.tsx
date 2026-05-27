export function LandingFooter() {
  return (
    <footer id="contact" className="bg-[#080808] px-6 py-14 md:px-10 lg:px-14">
      <div className="mx-auto flex max-w-[1880px] flex-col gap-8 border-t border-white/15 pt-10 text-white/65 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <span className="brand-mark small">ADMIN</span>
          <span className="font-display text-4xl text-white">VISION</span>
        </div>
        <p>Lagos, Nigeria · info@adminvisionhouse.com · +234 000 000 0000</p>
        <p>© {new Date().getFullYear()} Admin Vision House</p>
      </div>
    </footer>
  );
}
