import { Separator } from "@/components/ui/separator"
import { ClientOnly } from "@/components/client-only"
import { NotificationsForm } from "@/components/dashboard/notifications/notifications-form"

export default function SettingsNotificationsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Notifications</h3>
        <p className="text-sm text-muted-foreground">
          Configure how you receive notifications.
        </p>
      </div>
      <Separator />
      <ClientOnly>
        <NotificationsForm />
      </ClientOnly>
    </div>
  )
}
