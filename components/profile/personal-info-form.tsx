"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/hooks/use-auth"
import { useMutationAction } from "@/hooks/use-mutation"
import { userService } from "@/services/user.service"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Loader2 } from "lucide-react"
import type { UpdateProfileRequest } from "@/types/user"

export function PersonalInfoForm() {
  const { user, refreshUser } = useAuth()

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [bio, setBio] = useState("")
  const [profileImage, setProfileImage] = useState("")
  const [countryOfOrigin, setCountryOfOrigin] = useState("")
  const [targetCountries, setTargetCountries] = useState("")
  const [researchInterests, setResearchInterests] = useState("")

  useEffect(() => {
    if (user?.profile) {
      const p = user.profile
      setFirstName(p.firstName ?? "")
      setLastName(p.lastName ?? "")
      setPhoneNumber(p.phoneNumber ?? "")
      setBio(p.bio ?? "")
      setProfileImage(p.profileImage ?? "")
      setCountryOfOrigin(p.countryOfOrigin ?? "")
      setTargetCountries(p.targetCountries?.join(", ") ?? "")
      setResearchInterests(p.researchInterests?.join(", ") ?? "")
    }
  }, [user])

  const { mutate: updateProfile, isPending } = useMutationAction(
    (data: UpdateProfileRequest) => userService.updateProfile(data),
    { successMessage: "Profile updated successfully", onSuccess: () => { refreshUser(); console.log('love') } }
  )
  const commaSplit = (val: string) => val.split(",").map((s) => s.trim()).filter(Boolean)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const data: UpdateProfileRequest = {
      firstName: firstName || undefined,
      lastName: lastName || undefined,
      phoneNumber: phoneNumber || undefined,
      bio: bio || undefined,
      profileImage: profileImage || undefined,
      countryOfOrigin: countryOfOrigin || undefined,
      targetCountries: targetCountries ? commaSplit(targetCountries) : undefined,
      researchInterests: researchInterests ? commaSplit(researchInterests) : undefined,
    }
    updateProfile(data)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>Your basic personal details.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" placeholder="John" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" placeholder="Doe" value={lastName} onChange={(e) => setLastName(e.target.value)} />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="phoneNumber">Phone Number</Label>
            <Input id="phoneNumber" type="tel" placeholder="+1 (555) 000-0000" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea id="bio" placeholder="Tell us about yourself..." value={bio} onChange={(e) => setBio(e.target.value)} rows={3} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="profileImage">Profile Image URL</Label>
            <Input id="profileImage" type="url" placeholder="https://example.com/photo.jpg" value={profileImage} onChange={(e) => setProfileImage(e.target.value)} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Preferences</CardTitle>
          <CardDescription>Help us tailor recommendations to your needs.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="countryOfOrigin">Country of Origin</Label>
            <Input id="countryOfOrigin" placeholder="Nigeria" value={countryOfOrigin} onChange={(e) => setCountryOfOrigin(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="targetCountries">Target Countries</Label>
            <Input id="targetCountries" placeholder="USA, UK, Canada, Germany" value={targetCountries} onChange={(e) => setTargetCountries(e.target.value)} />
            <p className="text-xs text-muted-foreground">Separate multiple countries with commas.</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="researchInterests">Research Interests</Label>
            <Input id="researchInterests" placeholder="Machine Learning, NLP, Computer Vision" value={researchInterests} onChange={(e) => setResearchInterests(e.target.value)} />
            <p className="text-xs text-muted-foreground">Separate multiple interests with commas.</p>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button type="submit" disabled={isPending}>
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Save Changes
        </Button>
      </div>
    </form>
  )
}
