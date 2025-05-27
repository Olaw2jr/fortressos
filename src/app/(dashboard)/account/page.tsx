import { Separator } from "@/components/ui/separator"
import { ClientOnly } from "@/components/client-only"
import { AccountForm } from "@/components/dashboard/account/account-form"

export default function SettingsAccountPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Account</h3>
        <p className="text-sm text-muted-foreground">
          Update your account settings. Set your preferred language and
          timezone.
        </p>
      </div>
      <Separator />
      <ClientOnly>
        <AccountForm />
      </ClientOnly>
    </div>
  )
}
