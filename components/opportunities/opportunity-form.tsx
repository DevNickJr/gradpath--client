"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  OpportunityType,
  DegreeLevel,
  FundingType,
  OPPORTUNITY_TYPE_LABELS,
  DEGREE_LEVEL_LABELS,
  FUNDING_TYPE_LABELS,
} from "@/lib/constants"
import type { Opportunity, CreateOpportunityRequest } from "@/types/opportunity"

interface OpportunityFormProps {
  initialData?: Opportunity
  onSubmit: (data: CreateOpportunityRequest) => void
  isLoading?: boolean
}

export function OpportunityForm({ initialData, onSubmit, isLoading }: OpportunityFormProps) {
  const [title, setTitle] = useState(initialData?.title ?? "")
  const [description, setDescription] = useState(initialData?.description ?? "")
  const [university, setUniversity] = useState(initialData?.university ?? "")
  const [country, setCountry] = useState(initialData?.country ?? "")
  const [opportunityType, setOpportunityType] = useState<OpportunityType>(
    initialData?.opportunityType ?? OpportunityType.SCHOLARSHIP
  )
  const [degreeLevel, setDegreeLevel] = useState<DegreeLevel>(
    initialData?.degreeLevel ?? DegreeLevel.MASTERS
  )
  const [fundingType, setFundingType] = useState<FundingType>(
    initialData?.fundingType ?? FundingType.FULLY_FUNDED
  )
  const [deadline, setDeadline] = useState(
    initialData?.deadline ? initialData.deadline.split("T")[0] : ""
  )
  const [applicationLink, setApplicationLink] = useState(initialData?.applicationLink ?? "")
  const [sourceUrl, setSourceUrl] = useState(initialData?.sourceUrl ?? "")
  const [fieldsOfStudy, setFieldsOfStudy] = useState(
    initialData?.fieldsOfStudy?.join(", ") ?? ""
  )
  const [benefits, setBenefits] = useState(
    initialData?.benefits?.join(", ") ?? ""
  )
  const [isFeatured, setIsFeatured] = useState(initialData?.isFeatured ?? false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const data: CreateOpportunityRequest = {
      title,
      description,
      university,
      country,
      opportunityType,
      degreeLevel,
      fundingType,
      deadline,
      applicationLink,
      sourceUrl: sourceUrl || undefined,
      fieldsOfStudy: fieldsOfStudy
        ? fieldsOfStudy.split(",").map((s) => s.trim()).filter(Boolean)
        : undefined,
      benefits: benefits
        ? benefits.split(",").map((s) => s.trim()).filter(Boolean)
        : undefined,
      isFeatured,
    }

    onSubmit(data)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-1.5">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Opportunity title"
          required
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe the opportunity..."
          rows={5}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="university">University</Label>
          <Input
            id="university"
            value={university}
            onChange={(e) => setUniversity(e.target.value)}
            placeholder="University name"
            required
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="country">Country</Label>
          <Input
            id="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            placeholder="Country"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-1.5">
          <Label>Opportunity Type</Label>
          <Select
            value={opportunityType}
            onValueChange={(val) => val && setOpportunityType(val as OpportunityType)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              {Object.values(OpportunityType).map((type) => (
                <SelectItem key={type} value={type}>
                  {OPPORTUNITY_TYPE_LABELS[type]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <Label>Degree Level</Label>
          <Select
            value={degreeLevel}
            onValueChange={(val) => val && setDegreeLevel(val as DegreeLevel)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select degree" />
            </SelectTrigger>
            <SelectContent>
              {Object.values(DegreeLevel).map((level) => (
                <SelectItem key={level} value={level}>
                  {DEGREE_LEVEL_LABELS[level]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <Label>Funding Type</Label>
          <Select
            value={fundingType}
            onValueChange={(val) => val && setFundingType(val as FundingType)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select funding" />
            </SelectTrigger>
            <SelectContent>
              {Object.values(FundingType).map((type) => (
                <SelectItem key={type} value={type}>
                  {FUNDING_TYPE_LABELS[type]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="deadline">Deadline</Label>
          <Input
            id="deadline"
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            required
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="applicationLink">Application Link</Label>
          <Input
            id="applicationLink"
            type="url"
            value={applicationLink}
            onChange={(e) => setApplicationLink(e.target.value)}
            placeholder="https://..."
            required
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="sourceUrl">Source URL (optional)</Label>
        <Input
          id="sourceUrl"
          type="url"
          value={sourceUrl}
          onChange={(e) => setSourceUrl(e.target.value)}
          placeholder="https://..."
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="fieldsOfStudy">Fields of Study (comma-separated)</Label>
        <Input
          id="fieldsOfStudy"
          value={fieldsOfStudy}
          onChange={(e) => setFieldsOfStudy(e.target.value)}
          placeholder="Computer Science, Engineering, Biology..."
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="benefits">Benefits (comma-separated)</Label>
        <Input
          id="benefits"
          value={benefits}
          onChange={(e) => setBenefits(e.target.value)}
          placeholder="Full tuition, Monthly stipend, Housing..."
        />
      </div>

      <div className="flex items-center gap-2">
        <Checkbox
          id="isFeatured"
          checked={isFeatured}
          onCheckedChange={(checked) => setIsFeatured(checked === true)}
        />
        <Label htmlFor="isFeatured">Featured Opportunity</Label>
      </div>

      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading
          ? initialData
            ? "Updating..."
            : "Creating..."
          : initialData
            ? "Update Opportunity"
            : "Create Opportunity"}
      </Button>
    </form>
  )
}
