import Image from 'next/image';

export function PartnersSection() {
  return (
    <section className="pb-28 lg:pb-32">
      <div className="container mx-auto space-y-10 lg:space-y-16">
        <div className="text-center">
          <h2 className="mb-4 text-xl text-balance md:text-2xl lg:text-3xl">
            Trusted by risk managers worldwide.
            <br className="max-md:hidden" />
            <span className="text-muted-foreground">From SMEs to enterprise organizations across all industries.</span>
          </h2>
        </div>
        
        <div className="flex w-full flex-col items-center gap-8">
          {/* Desktop logos grid */}
          <div className="hidden md:block">
            <div className="grid items-center justify-items-center gap-x-20 lg:gap-x-28 grid-cols-4">
              {partners.map((partner) => (
                <a 
                  key={partner.name}
                  href={partner.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <Image
                    src={partner.logo}
                    alt={`${partner.name} logo`}
                    width={partner.width}
                    height={partner.height}
                    className="object-contain transition-opacity hover:opacity-70"
                  />
                </a>
              ))}
            </div>
          </div>
          
          {/* Mobile logos marquee */}
          <div className="md:hidden">
            <div className="overflow-hidden">
              <div className="flex animate-marquee">
                {partners.map((partner) => (
                  <a
                    key={partner.name}
                    href={partner.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mx-8 inline-block transition-opacity hover:opacity-70"
                  >
                    <Image
                      src={partner.logo}
                      alt={`${partner.name} logo`}
                      width={partner.width}
                      height={partner.height}
                      className="object-contain"
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>
          
          {/* Second row of logos */}
          <div className="hidden md:block">
            <div className="grid items-center justify-items-center gap-x-20 lg:gap-x-28 grid-cols-5">
              {additionalPartners.map((partner) => (
                <a 
                  key={partner.name}
                  href={partner.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <Image
                    src={partner.logo}
                    alt={`${partner.name} logo`}
                    width={partner.width}
                    height={partner.height}
                    className="object-contain transition-opacity hover:opacity-70"
                  />
                </a>
              ))}
            </div>
          </div>
          
          {/* Mobile second row logos marquee */}
          <div className="md:hidden">
            <div className="overflow-hidden">
              <div className="flex animate-marquee-reverse">
                {additionalPartners.map((partner) => (
                  <a
                    key={partner.name}
                    href={partner.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mx-8 inline-block transition-opacity hover:opacity-70"
                  >
                    <Image
                      src={partner.logo}
                      alt={`${partner.name} logo`}
                      width={partner.width}
                      height={partner.height}
                      className="object-contain"
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const partners = [
  {
    name: "Google Cloud",
    logo: "/logos/google-cloud.svg",
    url: "https://cloud.google.com",
    width: 143,
    height: 26
  },
  {
    name: "Microsoft",
    logo: "/logos/microsoft.svg",
    url: "https://microsoft.com",
    width: 154,
    height: 31
  },
  {
    name: "AWS",
    logo: "/logos/aws.svg",
    url: "https://aws.amazon.com",
    width: 113,
    height: 22
  },
  {
    name: "Cloudflare",
    logo: "/logos/cloudflare.svg",
    url: "https://cloudflare.com",
    width: 112,
    height: 27
  }
];

const additionalPartners = [
  {
    name: "IBM",
    logo: "/logos/ibm.svg",
    url: "https://ibm.com",
    width: 141,
    height: 32
  },
  {
    name: "Cisco",
    logo: "/logos/cisco.svg",
    url: "https://cisco.com",
    width: 104,
    height: 18
  },
  {
    name: "Oracle",
    logo: "/logos/oracle.svg",
    url: "https://oracle.com",
    width: 105,
    height: 28
  },
  {
    name: "Akamai",
    logo: "/logos/akamai.svg",
    url: "https://akamai.com",
    width: 128,
    height: 33
  },
  {
    name: "Digital Ocean",
    logo: "/logos/digitalocean.svg",
    url: "https://digitalocean.com",
    width: 90,
    height: 28
  }
];
