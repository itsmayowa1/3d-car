import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar"

export function TopMenu() {
  return (
    <Menubar className="px-2 lg:px-4 flex items-center justify-between">
      <div className="flex items-center">
        <MenubarMenu>
          <MenubarTrigger>GNX</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              New Tab <MenubarShortcut>⌘T</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>New Window</MenubarItem>
            <MenubarSeparator />
            <MenubarItem>Share</MenubarItem>
            <MenubarSeparator />
            <MenubarItem>Print</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>Music</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>Amazon Music</MenubarItem>
            <MenubarItem>Apple Music</MenubarItem>
            <MenubarItem>YouTube</MenubarItem>
            <MenubarItem>Tidal</MenubarItem>
            <MenubarItem>Soundcloud</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </div>

      <img 
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2.jpg-gBTVPIj5FtsQCfy1uIz67yOwyZaYlE.jpeg"
        alt="AG Logo"
        className="h-8"
      />

      <div className="flex items-center">
        <MenubarMenu>
          <MenubarTrigger>Tour</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>Super Bowl LIX</MenubarItem>
            <MenubarSeparator />
            <MenubarItem inset>
              Reload <MenubarShortcut>⌘R</MenubarShortcut>
            </MenubarItem>
            <MenubarItem disabled inset>
              Force Reload <MenubarShortcut>⇧⌘R</MenubarShortcut>
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem inset>Toggle Fullscreen</MenubarItem>
            <MenubarSeparator />
            <MenubarItem inset>Hide Sidebar</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>Merch</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>GNX Tee</MenubarItem>
            <MenubarSeparator />
            <MenubarItem>
             GNX Hoodie <MenubarShortcut>⌘D</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>
             GNX Fitted <MenubarShortcut>⇧⌘I</MenubarShortcut>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </div>
    </Menubar>
  )
}

