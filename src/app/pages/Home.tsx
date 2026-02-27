import { Link } from "react-router";
import { Upload, Sparkles, Shield, Zap, ArrowRight } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%238B0000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>

        <div className="container mx-auto px-4 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="inline-block">
                <div className="bg-gradient-to-r from-primary to-accent px-6 py-2 rounded-full">
                  <p className="text-white text-sm">தமிழ் பாரம்பரியம் • Tamil Heritage</p>
                </div>
              </div>
              
              <h1 className="text-5xl md:text-6xl leading-tight text-primary">
                Digitize Your <br />
                <span className="text-accent">Palm Leaf</span> <br />
                Manuscripts
              </h1>
              
              <p className="text-xl text-foreground/70 leading-relaxed">
                Transform ancient Tamil palm leaf manuscripts into digital format using advanced AI technology. 
                Preserve history, unlock knowledge.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/upload"
                  className="group inline-flex items-center justify-center gap-3 bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  <Upload className="w-5 h-5" />
                  Start Processing
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/about"
                  className="inline-flex items-center justify-center gap-3 bg-white hover:bg-muted border-2 border-primary text-primary px-8 py-4 rounded-xl transition-all duration-300 hover:scale-105"
                >
                  Learn More
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t-2 border-muted">
                <div>
                  <div className="text-3xl text-primary">500+</div>
                  <div className="text-sm text-muted-foreground">Manuscripts</div>
                </div>
                <div>
                  <div className="text-3xl text-accent">98%</div>
                  <div className="text-sm text-muted-foreground">Accuracy</div>
                </div>
                <div>
                  <div className="text-3xl text-primary">24/7</div>
                  <div className="text-sm text-muted-foreground">Available</div>
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-accent/20 blur-3xl"></div>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-secondary transform hover:scale-105 transition-transform duration-300">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1624192576692-b2d59ed366e1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmNpZW50JTIwdGFtaWwlMjBtYW51c2NyaXB0JTIwcGFsbSUyMGxlYWZ8ZW58MXx8fHwxNzcyMDk1MDQ2fDA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Ancient Tamil Palm Leaf Manuscript"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl text-primary mb-4">Why Choose Tamil Olaisuvadi?</h2>
            <p className="text-xl text-muted-foreground">
              Modern technology meets ancient wisdom
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="group relative bg-gradient-to-br from-background to-muted p-8 rounded-2xl border-2 border-primary/20 hover:border-primary transition-all duration-300 hover:shadow-xl">
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/20 transition-colors"></div>
              <div className="relative">
                <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl text-primary mb-4">AI-Powered</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Advanced machine learning algorithms trained specifically for Tamil palm leaf manuscript recognition.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="group relative bg-gradient-to-br from-background to-muted p-8 rounded-2xl border-2 border-accent/20 hover:border-accent transition-all duration-300 hover:shadow-xl">
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-accent/10 rounded-full blur-2xl group-hover:bg-accent/20 transition-colors"></div>
              <div className="relative">
                <div className="w-16 h-16 bg-accent rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl text-primary mb-4">Secure & Private</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Your manuscripts are processed securely. We respect the cultural and historical value of your documents.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="group relative bg-gradient-to-br from-background to-muted p-8 rounded-2xl border-2 border-secondary/20 hover:border-secondary transition-all duration-300 hover:shadow-xl">
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-secondary/10 rounded-full blur-2xl group-hover:bg-secondary/20 transition-colors"></div>
              <div className="relative">
                <div className="w-16 h-16 bg-secondary rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl text-primary mb-4">Fast Processing</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Get results in seconds. Our optimized pipeline ensures quick turnaround without compromising quality.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gradient-to-br from-muted/50 to-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl text-primary mb-4">How It Works</h2>
            <p className="text-xl text-muted-foreground">
              Simple three-step process
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-primary text-white rounded-full flex items-center justify-center text-3xl mx-auto shadow-lg">
                1
              </div>
              <h3 className="text-xl text-primary">Upload Image</h3>
              <p className="text-muted-foreground">
                Upload a clear photo of your palm leaf manuscript
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-accent text-white rounded-full flex items-center justify-center text-3xl mx-auto shadow-lg">
                2
              </div>
              <h3 className="text-xl text-primary">AI Processing</h3>
              <p className="text-muted-foreground">
                Our AI analyzes and digitizes the ancient script
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-secondary text-white rounded-full flex items-center justify-center text-3xl mx-auto shadow-lg">
                3
              </div>
              <h3 className="text-xl text-primary">Get Results</h3>
              <p className="text-muted-foreground">
                Download your digitized text and preserved manuscript
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1624284241524-271bb9752057?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFkaXRpb25hbCUyMGluZGlhbiUyMHBhdHRlcm4lMjBrb2xhbSUyMGRlc2lnbnxlbnwxfHx8fDE3NzIwOTUwNDZ8MA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Traditional Pattern"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-4xl md:text-5xl text-white">
              Ready to Preserve Your Heritage?
            </h2>
            <p className="text-xl text-white/90">
              Start digitizing your palm leaf manuscripts today and contribute to preserving Tamil cultural heritage.
            </p>
            <Link
              to="/upload"
              className="inline-flex items-center gap-3 bg-secondary hover:bg-secondary/90 text-white px-10 py-5 rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 text-lg"
            >
              <Upload className="w-6 h-6" />
              Get Started Now
              <ArrowRight className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
