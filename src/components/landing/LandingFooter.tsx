export function LandingFooter() {
  return (
    <footer id="contact" className="bg-[#080808] px-4 py-14 md:px-6 lg:px-8">
      <div className="mx-auto grid max-w-[1880px] gap-10 border-t border-white/15 pt-10 text-white/65 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-3">
            <span className="brand-mark small">ADMIN</span>
            <span className="font-display text-4xl text-white">VISION</span>
          </div>
          <p className="mt-4 max-w-sm text-sm text-white/60">
            Premium creative production spaces built for campaigns, brand
            content, podcasts, and visual storytelling.
          </p>
        </div>
        <div className="space-y-2 text-sm">
          <p className="font-bold text-white">Our Office</p>
          <p>Umudike Junction,</p>
          <p>Opp. Superlative Filling Station,</p>
          <p>Umuahia, Abia State, Nigeria</p>
          <p>info@adminvisionhouse.com</p>
          <p>+234 806 439 2746</p>
        </div>
        <div className="space-y-2 text-sm">
          <p className="font-bold text-white">Navigation</p>
          <p>Home</p>
          <p>About</p>
          <p>Services</p>
          <p>Portfolio</p>
        </div>
      </div>
      <div className="mx-auto mt-8 max-w-[1880px] border-t border-white/10 pt-6 text-xs text-white/45">
        © {new Date().getFullYear()} Admin Vision House. All rights reserved.
      </div>
    </footer>
  );
}
