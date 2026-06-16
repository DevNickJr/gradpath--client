"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/hooks/use-auth"
import { useMutationAction } from "@/hooks/use-mutation"
import { userService } from "@/services/user.service"
import { DEGREE_OPTIONS } from "@/lib/constants"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Loader2 } from "lucide-react"
import { PageLoader } from "@/components/shared/loading-spinner"
import type { UpdateProfileRequest } from "@/types/user"

export default function ProfilePage() {
  const { user, isLoading: authLoading, refreshUser } = useAuth()

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [bio, setBio] = useState("")
  const [profileImage, setProfileImage] = useState("")
  const [university, setUniversity] = useState("")
  const [degree, setDegree] = useState("")
  const [fieldOfStudy, setFieldOfStudy] = useState("")
  const [gpa, setGpa] = useState("")
  const [graduationYear, setGraduationYear] = useState("")
  const [countryOfOrigin, setCountryOfOrigin] = useState("")
  const [targetCountries, setTargetCountries] = useState("")
  const [researchInterests, setResearchInterests] = useState("")
  const [skills, setSkills] = useState("")
  const [workExperience, setWorkExperience] = useState("")
  const [publications, setPublications] = useState("")

  useEffect(() => {
    if (user?.profile) {
      const p = user.profile
      setFirstName(p.firstName ?? "")
      setLastName(p.lastName ?? "")
      setPhoneNumber(p.phoneNumber ?? "")
      setBio(p.bio ?? "")
      setProfileImage(p.profileImage ?? "")
      setUniversity(p.university ?? "")
      setDegree(p.degree ?? "")
      setFieldOfStudy(p.fieldOfStudy ?? "")
      setGpa(p.gpa != null ? String(p.gpa) : "")
      setGraduationYear(p.graduationYear != null ? String(p.graduationYear) : "")
      setCountryOfOrigin(p.countryOfOrigin ?? "")
      setTargetCountries(p.targetCountries?.join(", ") ?? "")
      setResearchInterests(p.researchInterests?.join(", ") ?? "")
      setSkills(p.skills?.join(", ") ?? "")
      setWorkExperience(p.workExperience ?? "")
      setPublications(p.publications?.join(", ") ?? "")
    }
  }, [user])

  const { mutate: updateProfile, isPending } = useMutationAction(
    (data: UpdateProfileRequest) => userService.updateProfile(data),
    {
      successMessage: "Profile updated successfully",
      onSuccess: () => {
        refreshUser()
      },
    }
  )

  if (authLoading) {
    return <PageLoader />
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const commaSplit = (val: string) =>
      val
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)

    const data: UpdateProfileRequest = {
      firstName: firstName || undefined,
      lastName: lastName || undefined,
      phoneNumber: phoneNumber || undefined,
      bio: bio || undefined,
      profileImage: profileImage || undefined,
      university: university || undefined,
      degree: degree || undefined,
      fieldOfStudy: fieldOfStudy || undefined,
      gpa: gpa ? parseFloat(gpa) : undefined,
      graduationYear: graduationYear ? parseInt(graduationYear, 10) : undefined,
      countryOfOrigin: countryOfOrigin || undefined,
      targetCountries: targetCountries ? commaSplit(targetCountries) : undefined,
      researchInterests: researchInterests ? commaSplit(researchInterests) : undefined,
      skills: skills ? commaSplit(skills) : undefined,
      workExperience: workExperience || undefined,
      publications: publications ? commaSplit(publications) : undefined,
    }

    updateProfile(data)
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold">Profile</h1>
        <p className="text-muted-foreground">
          Manage your personal and academic information.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>
              Your basic personal details.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  placeholder="John"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  placeholder="Doe"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input
                id="phoneNumber"
                type="tel"
                placeholder="+1 (555) 000-0000"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                placeholder="Tell us about yourself..."
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="profileImage">Profile Image URL</Label>
              <Input
                id="profileImage"
                type="url"
                placeholder="https://example.com/photo.jpg"
                value={profileImage}
                onChange={(e) => setProfileImage(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Academic Information</CardTitle>
            <CardDescription>
              Your educational background and academic details.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="university">University</Label>
              <Input
                id="university"
                placeholder="Massachusetts Institute of Technology"
                value={university}
                onChange={(e) => setUniversity(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="degree">Degree</Label>
                <Select
                  value={degree}
                  onValueChange={(val) => {
                    if (val) setDegree(val)
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select degree" />
                  </SelectTrigger>
                  <SelectContent>
                    {DEGREE_OPTIONS.map((opt) => (
                      <SelectItem key={opt} value={opt}>
                        {opt}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="fieldOfStudy">Field of Study</Label>
                <Input
                  id="fieldOfStudy"
                  placeholder="Computer Science"
                  value={fieldOfStudy}
                  onChange={(e) => setFieldOfStudy(e.target.value)}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="gpa">GPA</Label>
                <Input
                  id="gpa"
                  type="number"
                  step="0.01"
                  min="0"
                  max="4"
                  placeholder="3.85"
                  value={gpa}
                  onChange={(e) => setGpa(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="graduationYear">Graduation Year</Label>
                <Input
                  id="graduationYear"
                  type="number"
                  min="2000"
                  max="2035"
                  placeholder="2026"
                  value={graduationYear}
                  onChange={(e) => setGraduationYear(e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Preferences</CardTitle>
            <CardDescription>
              Help us tailor scholarship recommendations to your needs.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="countryOfOrigin">Country of Origin</Label>
              <Input
                id="countryOfOrigin"
                placeholder="Nigeria"
                value={countryOfOrigin}
                onChange={(e) => setCountryOfOrigin(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="targetCountries">Target Countries</Label>
              <Input
                id="targetCountries"
                placeholder="USA, UK, Canada, Germany"
                value={targetCountries}
                onChange={(e) => setTargetCountries(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Separate multiple countries with commas.
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="researchInterests">Research Interests</Label>
              <Input
                id="researchInterests"
                placeholder="Machine Learning, NLP, Computer Vision"
                value={researchInterests}
                onChange={(e) => setResearchInterests(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Separate multiple interests with commas.
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="skills">Skills</Label>
              <Input
                id="skills"
                placeholder="Python, TensorFlow, Research, Academic Writing"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Separate multiple skills with commas.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Experience</CardTitle>
            <CardDescription>
              Your professional and academic experience.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="workExperience">Work Experience</Label>
              <Textarea
                id="workExperience"
                placeholder="Describe your work experience..."
                value={workExperience}
                onChange={(e) => setWorkExperience(e.target.value)}
                rows={4}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="publications">Publications</Label>
              <Input
                id="publications"
                placeholder="Paper Title 1, Paper Title 2"
                value={publications}
                onChange={(e) => setPublications(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Separate multiple publications with commas.
              </p>
            </div>
          </CardContent>
        </Card>

        <Separator />

        <div className="flex justify-end">
          <Button type="submit" disabled={isPending}>
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  )
}
