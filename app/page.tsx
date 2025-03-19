import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, CheckCircle } from "lucide-react"
import FeaturedJobs from "@/components/featured-jobs"
import TopFreelancers from "@/components/top-freelancers"
import CategoryList from "@/components/category-list"

export default function Home() {
  return (
    <div className="flex flex-col gap-16 pb-16">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Find Top Talent or Get Hired Today
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Connect with skilled freelancers or showcase your expertise to clients worldwide. Our platform makes
                  collaboration seamless and secure.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button asChild size="lg">
                  <Link href="/jobs">Find Work</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/post-job">Hire Talent</Link>
                </Button>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span>No fees until you hire</span>
                <CheckCircle className="ml-2 h-4 w-4 text-primary" />
                <span>Secure payments</span>
                <CheckCircle className="ml-2 h-4 w-4 text-primary" />
                <span>24/7 support</span>
              </div>
            </div>
            <div className="relative h-[400px] lg:h-[600px] rounded-xl overflow-hidden">
              <Image
                src="/placeholder.svg?height=600&width=800"
                alt="Freelancers collaborating"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="container px-4 md:px-6">
        <div className="flex flex-col gap-2 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Browse Categories</h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
            Explore services across various categories to find the perfect match for your project
          </p>
        </div>
        <div className="mt-8">
          <CategoryList />
        </div>
      </section>

      {/* Featured Jobs Section */}
      <section className="container px-4 md:px-6">
        <div className="flex flex-col gap-2">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Featured Jobs</h2>
          <p className="max-w-[700px] text-muted-foreground md:text-xl">
            Discover the latest opportunities from top clients
          </p>
        </div>
        <div className="mt-8">
          <FeaturedJobs />
        </div>
        <div className="mt-8 text-center">
          <Button asChild variant="outline">
            <Link href="/jobs">
              View All Jobs
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Top Freelancers Section */}
      <section className="container px-4 md:px-6">
        <div className="flex flex-col gap-2">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Top Freelancers</h2>
          <p className="max-w-[700px] text-muted-foreground md:text-xl">
            Work with the best talent from around the world
          </p>
        </div>
        <div className="mt-8">
          <TopFreelancers />
        </div>
        <div className="mt-8 text-center">
          <Button asChild variant="outline">
            <Link href="/freelancers">
              View All Freelancers
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="container px-4 md:px-6 py-12 bg-muted rounded-xl">
        <div className="flex flex-col gap-2 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">How It Works</h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
            Our platform makes it easy to connect, collaborate, and complete projects
          </p>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          <div className="flex flex-col items-center text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground text-xl font-bold">
              1
            </div>
            <h3 className="mt-4 text-xl font-bold">Post a Job</h3>
            <p className="mt-2 text-muted-foreground">
              Describe your project, set your budget, and specify requirements
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground text-xl font-bold">
              2
            </div>
            <h3 className="mt-4 text-xl font-bold">Receive Proposals</h3>
            <p className="mt-2 text-muted-foreground">
              Review bids from qualified freelancers and select the best match
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground text-xl font-bold">
              3
            </div>
            <h3 className="mt-4 text-xl font-bold">Collaborate & Pay</h3>
            <p className="mt-2 text-muted-foreground">
              Work together through our platform and release payment when satisfied
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container px-4 md:px-6">
        <div className="rounded-xl bg-primary text-primary-foreground p-8 md:p-12 lg:p-16">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Ready to Get Started?</h2>
            <p className="mt-4 text-lg md:text-xl">
              Join thousands of freelancers and clients already using our platform
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row justify-center">
              <Button asChild size="lg" variant="secondary">
                <Link href="/register">Create an Account</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="bg-transparent border-primary-foreground hover:bg-primary-foreground/10"
              >
                <Link href="/how-it-works">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

