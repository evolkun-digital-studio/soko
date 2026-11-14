import Header from "@/components/Header";
import Float from "@/components/Float";
import Reveal from "@/components/Reveal";
import Gallery from "@/components/Gallery";
import Newsletter from "@/components/Newsletter";

const bakes = [
  { name: "Cinnamon Roll", price: "$4.00", img: "/img/menu/cinnamon-roll.webp" },
  { name: "Sea Salt Chocolate Cookie", price: "$2.50", img: "/img/menu/sea-salt-cookie.webp" },
  { name: "Butter Croissant", price: "$3.50", img: "/img/menu/butter-croissant.webp" },
  { name: "Cappuccino", price: "$4.50", img: "/img/menu/cappuccino.webp" },
];

export default function Home() {
  return (
    <>
      <Header />

      <main id="top">
        {/* ───────────── HERO ───────────── */}
        <section className="hero" data-theme="dark">
          <Float src="/img/cut-card-brown.webp" speed={0.5} rotate={-10} className="f-hero-brown" fly />
          <Float src="/img/cut-biz.webp" speed={0.5} rotate={8} className="f-hero-biz" fly />
          <Float src="/img/cut-card-cream.webp" speed={-0.2} rotate={-8} className="f-hero-cream" fly />
          {/* box + bag product shot: one Float, so both move as a unit */}
          <Float speed={-0.2} className="f-hero-pair" fly>
            <div className="pair">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="pair-box" src="/img/cut-box.webp" alt="" draggable={false} />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="pair-bag" src="/img/cut-bag.webp" alt="" draggable={false} />
            </div>
          </Float>

          <div className="hero-mark">
            <h1 className="sr-only">SOKO Café &amp; Bakery</h1>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/img/logo-cream.png" alt="SOKO Café &amp; Bakery — a cat asleep on the SOKO wordmark" width={1400} height={1055} fetchPriority="high" />
            <a href="#menu" className="tag-btn hero-btn">
              Explore Menu
            </a>
          </div>
        </section>

        {/* ───────────── STORY / INTRO ───────────── */}
        <section className="intro" id="story" data-theme="dark">
          <Float src="/img/cut-biz.webp" speed={0.35} rotate={-16} className="f-intro-biz" />
          <Float src="/img/cut-bag.webp" speed={-0.25} rotate={18} className="f-intro-bag" />

          <Reveal className="intro-copy">
            <h2 className="script">
              Slow Coffee,
              <br />
              Fresh Bakes
            </h2>
            <p>
              SOKO started with a simple idea: a corner where time slows down. We laminate our croissants by hand,
              pull every shot with care and bake in small batches each morning, so whatever you pick up tastes like it
              was made just for you. Pull up a chair, stay a while, and do it like our cat would.
            </p>
            <a href="#visit" className="text-link">
              Read Our Story &gt;
            </a>
          </Reveal>
        </section>

        {/* ───────────── PRODUCTS PANEL ───────────── */}
        <section className="bakes-wrap" id="menu" data-theme="light">
          <div className="panel">
            <span className="notch" aria-hidden />
            <Reveal>
              <h2 className="script ink">Warm From Our Ovens</h2>
              <p className="panel-lede">
                From three-day laminated croissants to slow-poured cappuccinos, everything at SOKO
                is made from scratch, in small batches, every single morning.
              </p>
            </Reveal>

            <ul className="bakes">
              {bakes.map((b, i) => (
                <Reveal as="li" key={b.name} delay={i * 110} className="bake">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={b.img} alt={b.name} loading="lazy" />
                  <h3>{b.name}</h3>
                  <p className="price">{b.price}</p>
                </Reveal>
              ))}
            </ul>

            <a href="#gallery" className="tag-btn panel-btn">
              See what&apos;s baking
            </a>
          </div>
        </section>

        {/* ───────────── TESTIMONIAL ───────────── */}
        <section className="quote" data-theme="dark">
          <Float src="/img/promise/swirl.webp" speed={0.35} rotate={-8} className="f-q-cookie" />
          <Float src="/img/promise/iced-latte.webp" speed={0.2} rotate={10} className="f-q-coffee" />
          <Float src="/img/promise/pistachio-swirl.webp" speed={-0.15} rotate={-6} className="f-q-cake" />
          <Float src="/img/promise/pretzel.webp" speed={0.3} rotate={14} className="f-q-croissant" />

          <Reveal className="quote-inner">
            <h2 className="script">The SOKO Promise</h2>
            <blockquote>
              &ldquo;Nothing here is rushed.
              <br />
              Our dough rests for three days, every coffee is brewed slow, and every bake leaves the oven the same
              morning you take it home. Good things, like naps, take time.&rdquo;
            </blockquote>
            <p className="cite">The SOKO Bakers</p>
          </Reveal>
        </section>

        {/* ───────────── GALLERY ───────────── */}
        <section className="kitchen" id="gallery" data-theme="dark">
          <Reveal>
            <h2 className="script">Caught at SOKO</h2>
          </Reveal>
          <Gallery />
        </section>
      </main>

      {/* ───────────── FOOTER ───────────── */}
      <footer className="footer" id="visit" data-theme="light">
        <span className="notch" aria-hidden />
        <div className="footer-grid">
          <div className="footer-join">
            <h2 className="script ink">
              Join The
              <br />
              Neighbourhood
            </h2>
            <p>Be the first to hear about seasonal bakes, latte-art workshops and our weekly croissant drop.</p>
            <Newsletter />
          </div>

          <div className="footer-info">
            <address>
              <span>SOKO Café &amp; Bakery</span>
              <span>Your street address, City</span>
            </address>
            <p className="contact">
              <a href="mailto:hello@sokocafe.com">hello@sokocafe.com</a>
              <a href="tel:+919876543210">+91 98765 43210</a>
              <a href="https://instagram.com/sokocafe" target="_blank" rel="noreferrer">
                @sokocafe
              </a>
            </p>
          </div>

          <nav className="footer-nav" aria-label="Footer">
            <a href="#top">Home</a>
            <a href="#menu">Our Menu</a>
            <a href="#story">About</a>
            <a href="#visit">Visit Us</a>
          </nav>

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="footer-mark" src="/img/logo-full.svg" alt="SOKO" loading="lazy" />
        </div>

        <div className="legal">
          <nav aria-label="Legal">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms &amp; Conditions</a>
            <a href="#">Refund Policy</a>
            <a href="#">Accessibility Statement</a>
          </nav>
          <p>© {new Date().getFullYear()} SOKO Café &amp; Bakery. Coffee &amp; calm.</p>
        </div>
      </footer>
    </>
  );
}
