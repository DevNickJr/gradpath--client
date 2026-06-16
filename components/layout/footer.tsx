import Link from "next/link"
import { GraduationCap } from "lucide-react"
import { ROUTES } from "@/lib/constants"
import { Separator } from "@/components/ui/separator"

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <Link href={ROUTES.HOME} className="flex items-center gap-2">
              <GraduationCap className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">GradPath</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              AI-powered graduate scholarship and opportunity discovery platform.
              Find your path to academic success.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Explore</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href={ROUTES.OPPORTUNITIES} className="hover:text-foreground transition-colors">All Opportunities</Link></li>
              <li><Link href={`${ROUTES.OPPORTUNITIES}?fundingType=fully_funded`} className="hover:text-foreground transition-colors">Fully Funded</Link></li>
              <li><Link href={`${ROUTES.OPPORTUNITIES}?degreeLevel=phd`} className="hover:text-foreground transition-colors">PhD Programs</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href={ROUTES.ABOUT} className="hover:text-foreground transition-colors">About Us</Link></li>
              <li><Link href={ROUTES.CONTACT} className="hover:text-foreground transition-colors">Contact</Link></li>
              <li><Link href={ROUTES.FAQ} className="hover:text-foreground transition-colors">FAQ</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Account</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href={ROUTES.LOGIN} className="hover:text-foreground transition-colors">Sign In</Link></li>
              <li><Link href={ROUTES.REGISTER} className="hover:text-foreground transition-colors">Register</Link></li>
              <li><Link href={ROUTES.DASHBOARD} className="hover:text-foreground transition-colors">Dashboard</Link></li>
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} GradPath. All rights reserved.</p>
          <div className="flex gap-4 mt-2 md:mt-0">
            <span className="hover:text-foreground cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-foreground cursor-pointer transition-colors">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
