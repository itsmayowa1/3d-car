import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

const tracks = [
  "Savior",
  "United In Grief",
  "Die Hard",
  "Father Time",
  "Rich Spirit",
  "We Cry Together",
  "Purple Hearts",
  "Count Me Out",
  "Crown",
  "Silent Hill",
  "Worldwide Steppers",
  "Mother I Sober",
  "Mirror",
]

export function Tracklist() {
  return (
    <ScrollArea className="h-72 w-48 rounded-md border">
      <div className="p-4">
        <h4 className="mb-4 text-sm font-medium leading-none">Tracklist</h4>
        {tracks.map((track, index) => (
          <div key={track}>
            <div className="text-sm">{track}</div>
            {index < tracks.length - 1 && <Separator className="my-2" />}
          </div>
        ))}
      </div>
    </ScrollArea>
  )
}

