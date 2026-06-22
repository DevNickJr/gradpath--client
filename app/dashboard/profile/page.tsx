"use client"

import { useAuth } from "@/hooks/use-auth"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PageLoader } from "@/components/shared/loading-spinner"
import { PersonalInfoForm } from "@/components/profile/personal-info-form"
import { EducationSection } from "@/components/profile/education-section"
import { ExperienceSection } from "@/components/profile/experience-section"
import { PublicationSection } from "@/components/profile/publication-section"
import { TestScoreSection } from "@/components/profile/test-score-section"
import { CertificationSection } from "@/components/profile/certification-section"
import { AwardSection } from "@/components/profile/award-section"
import { RefereeSection } from "@/components/profile/referee-section"

export default function ProfilePage() {
  const { isLoading: authLoading } = useAuth()

  if (authLoading) {
    return <PageLoader />
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold">Profile</h1>
        <p className="text-muted-foreground">
          Manage your personal and academic information.
        </p>
      </div>

      <Tabs defaultValue="personal" className="space-y-6 flex flex-col" >
        <TabsList className="flex flex-wrap h-auto gap-1">
          <TabsTrigger value="personal">Personal Info</TabsTrigger>
          <TabsTrigger value="education">Education</TabsTrigger>
          <TabsTrigger value="experience">Experience</TabsTrigger>
          <TabsTrigger value="publications">Publications</TabsTrigger>
          <TabsTrigger value="test-scores">Test Scores</TabsTrigger>
          <TabsTrigger value="certifications">Certifications</TabsTrigger>
          <TabsTrigger value="awards">Awards</TabsTrigger>
          <TabsTrigger value="referees">Referees</TabsTrigger>
        </TabsList>

        <TabsContent value="personal">
          <PersonalInfoForm />
        </TabsContent>

        <TabsContent value="education">
          <EducationSection />
        </TabsContent>

        <TabsContent value="experience">
          <ExperienceSection />
        </TabsContent>

        <TabsContent value="publications">
          <PublicationSection />
        </TabsContent>

        <TabsContent value="test-scores">
          <TestScoreSection />
        </TabsContent>

        <TabsContent value="certifications">
          <CertificationSection />
        </TabsContent>

        <TabsContent value="awards">
          <AwardSection />
        </TabsContent>

        <TabsContent value="referees">
          <RefereeSection />
        </TabsContent>
      </Tabs>
    </div>
  )
}
