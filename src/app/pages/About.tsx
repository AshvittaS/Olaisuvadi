import { Heart, Users, Target, Lightbulb, Globe, BookOpen } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-accent text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="inline-block bg-white/20 px-6 py-2 rounded-full mb-4">
              <p className="text-white text-sm">எங்களை பற்றி • About Us</p>
            </div>
            <h1 className="text-5xl md:text-6xl">
              Preserving Tamil Heritage Through Technology
            </h1>
            <p className="text-xl text-white/90">
              Bridging the gap between ancient wisdom and modern innovation
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full">
                <Target className="w-5 h-5 text-primary" />
                <span className="text-primary">Our Mission</span>
              </div>
              <h2 className="text-4xl text-primary">
                Digitizing Ancient Tamil Manuscripts
              </h2>
              <p className="text-lg text-foreground/70 leading-relaxed">
                Tamil Olaisuvadi is dedicated to preserving and digitizing ancient Tamil palm leaf manuscripts 
                (Olaisuvadi) using cutting-edge artificial intelligence technology. Our mission is to make these 
                invaluable historical documents accessible to researchers, scholars, and Tamil language enthusiasts 
                around the world.
              </p>
              <p className="text-lg text-foreground/70 leading-relaxed">
                Palm leaf manuscripts contain centuries of Tamil literature, scientific knowledge, medical texts, 
                and cultural wisdom. By digitizing these fragile documents, we ensure that this knowledge is 
                preserved for future generations while making it searchable and accessible to everyone.
              </p>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-accent/20 blur-3xl"></div>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-secondary">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1650632784843-5540e36e8aca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YW1pbCUyMGN1bHR1cmUlMjBoZXJpdGFnZSUyMHRyYWRpdGlvbmFsfGVufDF8fHx8MTc3MjA5NTEyOXww&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Tamil Culture Heritage"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl text-primary mb-4">Our Core Values</h2>
            <p className="text-xl text-muted-foreground">
              Guided by tradition, powered by innovation
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Value 1 */}
            <div className="bg-gradient-to-br from-background to-muted p-8 rounded-2xl border-2 border-primary/20 hover:border-primary transition-all duration-300 hover:shadow-xl group">
              <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl text-primary mb-4">Cultural Preservation</h3>
              <p className="text-muted-foreground leading-relaxed">
                We are passionate about preserving Tamil cultural heritage and making it accessible to future generations.
              </p>
            </div>

            {/* Value 2 */}
            <div className="bg-gradient-to-br from-background to-muted p-8 rounded-2xl border-2 border-accent/20 hover:border-accent transition-all duration-300 hover:shadow-xl group">
              <div className="w-16 h-16 bg-accent rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Lightbulb className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl text-primary mb-4">Innovation</h3>
              <p className="text-muted-foreground leading-relaxed">
                We leverage the latest AI and machine learning technologies to solve complex digitization challenges.
              </p>
            </div>

            {/* Value 3 */}
            <div className="bg-gradient-to-br from-background to-muted p-8 rounded-2xl border-2 border-secondary/20 hover:border-secondary transition-all duration-300 hover:shadow-xl group">
              <div className="w-16 h-16 bg-secondary rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl text-primary mb-4">Accessibility</h3>
              <p className="text-muted-foreground leading-relaxed">
                We believe knowledge should be free and accessible to everyone, anywhere in the world.
              </p>
            </div>

            {/* Value 4 */}
            <div className="bg-gradient-to-br from-background to-muted p-8 rounded-2xl border-2 border-primary/20 hover:border-primary transition-all duration-300 hover:shadow-xl group">
              <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl text-primary mb-4">Community</h3>
              <p className="text-muted-foreground leading-relaxed">
                We work closely with scholars, libraries, and cultural institutions to build a collaborative ecosystem.
              </p>
            </div>

            {/* Value 5 */}
            <div className="bg-gradient-to-br from-background to-muted p-8 rounded-2xl border-2 border-accent/20 hover:border-accent transition-all duration-300 hover:shadow-xl group">
              <div className="w-16 h-16 bg-accent rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl text-primary mb-4">Accuracy</h3>
              <p className="text-muted-foreground leading-relaxed">
                We are committed to maintaining the highest standards of accuracy in our digitization process.
              </p>
            </div>

            {/* Value 6 */}
            <div className="bg-gradient-to-br from-background to-muted p-8 rounded-2xl border-2 border-secondary/20 hover:border-secondary transition-all duration-300 hover:shadow-xl group">
              <div className="w-16 h-16 bg-secondary rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl text-primary mb-4">Excellence</h3>
              <p className="text-muted-foreground leading-relaxed">
                We strive for excellence in every aspect of our work, from technology to customer service.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-20 bg-gradient-to-br from-muted/50 to-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative order-2 lg:order-1">
              <div className="absolute -inset-4 bg-gradient-to-r from-accent/20 to-primary/20 blur-3xl"></div>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-secondary">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1538765422338-25c9bca65519?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmNpZW50JTIwYm9va3MlMjBsaWJyYXJ5JTIwcHJlc2VydmF0aW9ufGVufDF8fHx8MTc3MjA5NTEzMHww&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Ancient Books Library"
                  className="w-full h-auto"
                />
              </div>
            </div>
            <div className="space-y-6 order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 bg-accent/10 px-4 py-2 rounded-full">
                <Lightbulb className="w-5 h-5 text-accent" />
                <span className="text-accent">Our Technology</span>
              </div>
              <h2 className="text-4xl text-primary">
                AI-Powered OCR for Tamil Scripts
              </h2>
              <p className="text-lg text-foreground/70 leading-relaxed">
                Our proprietary AI model has been specifically trained on thousands of Tamil palm leaf manuscripts, 
                enabling it to recognize and digitize even the most degraded or damaged texts with remarkable accuracy.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <p className="text-foreground/70">
                    <strong className="text-primary">Deep Learning:</strong> Advanced neural networks trained on historical Tamil scripts
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <p className="text-foreground/70">
                    <strong className="text-primary">Image Enhancement:</strong> Automatic restoration and enhancement of faded texts
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <p className="text-foreground/70">
                    <strong className="text-primary">Character Recognition:</strong> 98% accuracy in recognizing ancient Tamil characters
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <p className="text-foreground/70">
                    <strong className="text-primary">Context Analysis:</strong> Understanding context to improve accuracy
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl text-primary mb-4">Our Impact</h2>
            <p className="text-xl text-muted-foreground">
              Making a difference in cultural preservation
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            <div className="text-center space-y-2">
              <div className="text-5xl text-primary">500+</div>
              <p className="text-muted-foreground">Manuscripts Digitized</p>
            </div>
            <div className="text-center space-y-2">
              <div className="text-5xl text-accent">50K+</div>
              <p className="text-muted-foreground">Pages Processed</p>
            </div>
            <div className="text-center space-y-2">
              <div className="text-5xl text-secondary">98%</div>
              <p className="text-muted-foreground">Accuracy Rate</p>
            </div>
            <div className="text-center space-y-2">
              <div className="text-5xl text-primary">15+</div>
              <p className="text-muted-foreground">Partner Institutions</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-accent text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-4xl md:text-5xl">
              Join Us in Preserving Heritage
            </h2>
            <p className="text-xl text-white/90">
              Whether you're a researcher, scholar, library, or simply passionate about Tamil culture, 
              we invite you to be part of this important mission.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <a
                href="mailto:info@tamilolaisuvadi.com"
                className="inline-flex items-center justify-center bg-white hover:bg-white/90 text-primary px-8 py-4 rounded-xl shadow-lg transition-all duration-300 hover:scale-105"
              >
                Contact Us
              </a>
              <a
                href="#partnership"
                className="inline-flex items-center justify-center border-2 border-white hover:bg-white/10 text-white px-8 py-4 rounded-xl transition-all duration-300"
              >
                Partner With Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
