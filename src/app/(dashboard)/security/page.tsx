import { Separator } from "@/components/ui/separator"
import { ClientOnly } from "@/components/client-only"
import { SecurityForm } from "@/components/dashboard/security/security-form"

export default function SecurityPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Security</h3>
        <p className="text-sm text-muted-foreground">
          Manage your password and two-factor authentication settings.
        </p>
      </div>
      <Separator />
      <ClientOnly>
        <SecurityForm />
      </ClientOnly>
    </div>
  )
}
