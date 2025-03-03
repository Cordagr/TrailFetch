"use client"

import { useState } from "react"
import { Search, MapPin, Filter, Compass, Mountain, Clock, Route } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Sample trail data
const trails = [
  {
    id: 1,
    name: "Pine Mountain Trail",
    location: "Mountain View Park",
    distance: 3.2,
    difficulty: "Easy",
    elevation: 250,
    time: "1.5 hours",
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.7,
  },
  {
    id: 2,
    name: "Eagle Ridge Loop",
    location: "Eagle Ridge State Park",
    distance: 5.8,
    difficulty: "Moderate",
    elevation: 620,
    time: "3 hours",
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.9,
  },
  {
    id: 3,
    name: "Cascade Falls Trail",
    location: "Cascade Mountains",
    distance: 2.4,
    difficulty: "Easy",
    elevation: 180,
    time: "1 hour",
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.5,
  },
  {
    id: 4,
    name: "Summit Peak Trail",
    location: "Highland National Forest",
    distance: 8.6,
    difficulty: "Hard",
    elevation: 1250,
    time: "5 hours",
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.8,
  },
  {
    id: 5,
    name: "Riverside Path",
    location: "River Valley Park",
    distance: 1.8,
    difficulty: "Easy",
    elevation: 50,
    time: "45 minutes",
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.3,
  },
  {
    id: 6,
    name: "Cedar Canyon Trail",
    location: "Cedar Canyon Preserve",
    distance: 4.5,
    difficulty: "Moderate",
    elevation: 480,
    time: "2.5 hours",
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.6,
  },
]

export default function TrailFinder() {
  const [searchQuery, setSearchQuery] = useState("")
  const [viewType, setViewType] = useState("list")
  const [maxDistance, setMaxDistance] = useState(10)
  const [difficulty, setDifficulty] = useState("all")

  // Filter trails based on search and filters
  const filteredTrails = trails.filter((trail) => {
    const matchesSearch =
      trail.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trail.location.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesDifficulty = difficulty === "all" || trail.difficulty.toLowerCase() === difficulty.toLowerCase()
    const matchesDistance = trail.distance <= maxDistance

    return matchesSearch && matchesDifficulty && matchesDistance
  })

  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case "easy":
        return "bg-green-500"
      case "moderate":
        return "bg-yellow-500"
      case "hard":
        return "bg-red-500"
      default:
        return "bg-blue-500"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 dark:from-green-950 dark:to-slate-950">
      <header className="bg-white dark:bg-slate-900 shadow-md">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center">
              <Compass className="h-8 w-8 text-green-600 dark:text-green-400 mr-2" />
              <h1 className="text-2xl font-bold text-green-800 dark:text-green-300">TrailFinder</h1>
            </div>

            <div className="relative flex-1 max-w-xl">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Search trails by name or location..."
                className="pl-10 pr-4 py-2 w-full rounded-full border-green-200 focus:border-green-500 focus:ring-green-500 dark:bg-slate-800 dark:border-slate-700"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-2">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    <span>Filters</span>
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Filter Trails</SheetTitle>
                    <SheetDescription>Customize your trail search</SheetDescription>
                  </SheetHeader>
                  <div className="py-6 space-y-6">
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium">Maximum Distance</h3>
                      <div className="flex items-center gap-4">
                        <Slider
                          defaultValue={[maxDistance]}
                          max={20}
                          step={0.5}
                          onValueChange={(value) => setMaxDistance(value[0])}
                        />
                        <span className="text-sm font-medium">{maxDistance} miles</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-sm font-medium">Difficulty</h3>
                      <Select value={difficulty} onValueChange={setDifficulty}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select difficulty" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Difficulties</SelectItem>
                          <SelectItem value="easy">Easy</SelectItem>
                          <SelectItem value="moderate">Moderate</SelectItem>
                          <SelectItem value="hard">Hard</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>

              <div className="flex rounded-md overflow-hidden">
                <Button
                  variant={viewType === "list" ? "default" : "outline"}
                  className="rounded-r-none"
                  onClick={() => setViewType("list")}
                >
                  List
                </Button>
                <Button
                  variant={viewType === "map" ? "default" : "outline"}
                  className="rounded-l-none"
                  onClick={() => setViewType("map")}
                >
                  Map
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {viewType === "list" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTrails.length > 0 ? (
              filteredTrails.map((trail) => (
                <Card key={trail.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative h-48">
                    <img
                      src={trail.image || "/placeholder.svg"}
                      alt={trail.name}
                      className="w-full h-full object-cover"
                    />
                    <Badge className={`absolute top-3 right-3 ${getDifficultyColor(trail.difficulty)}`}>
                      {trail.difficulty}
                    </Badge>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold">{trail.name}</h3>
                      <div className="flex items-center">
                        <span className="text-yellow-500">★</span>
                        <span className="ml-1 text-sm font-medium">{trail.rating}</span>
                      </div>
                    </div>
                    <div className="flex items-center text-gray-500 dark:text-gray-400 mb-3">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span className="text-sm">{trail.location}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-sm">
                      <div className="flex flex-col items-center p-2 bg-gray-50 dark:bg-slate-800 rounded">
                        <Route className="h-4 w-4 mb-1 text-green-600 dark:text-green-400" />
                        <span className="font-medium">{trail.distance} mi</span>
                      </div>
                      <div className="flex flex-col items-center p-2 bg-gray-50 dark:bg-slate-800 rounded">
                        <Mountain className="h-4 w-4 mb-1 text-green-600 dark:text-green-400" />
                        <span className="font-medium">{trail.elevation} ft</span>
                      </div>
                      <div className="flex flex-col items-center p-2 bg-gray-50 dark:bg-slate-800 rounded">
                        <Clock className="h-4 w-4 mb-1 text-green-600 dark:text-green-400" />
                        <span className="font-medium">{trail.time}</span>
                      </div>
                    </div>
                    <Button className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white">View Trail</Button>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
                <Search className="h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-xl font-medium mb-2">No trails found</h3>
                <p className="text-gray-500 dark:text-gray-400 max-w-md">
                  Try adjusting your search or filters to find more trails in your area.
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md overflow-hidden">
            <div className="relative h-[70vh] bg-gray-100 dark:bg-slate-700">
              {/* Map placeholder */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-12 w-12 text-green-600 dark:text-green-400 mx-auto mb-4" />
                  <h3 className="text-xl font-medium mb-2">Map View</h3>
                  <p className="text-gray-500 dark:text-gray-400 max-w-md px-4">
                    In a real application, this would display an interactive map with trail markers.
                  </p>
                </div>
              </div>

              {/* Trail markers */}
              {filteredTrails.map((trail, index) => {
                // Generate random positions for demo purposes
                const left = 15 + ((index * 12) % 70)
                const top = 20 + ((index * 15) % 60)

                return (
                  <div
                    key={trail.id}
                    className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 group"
                    style={{ left: `${left}%`, top: `${top}%` }}
                  >
                    <div
                      className={`h-4 w-4 rounded-full ${getDifficultyColor(trail.difficulty)} ring-4 ring-white dark:ring-slate-700`}
                    ></div>
                    <div className="opacity-0 group-hover:opacity-100 absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 bg-white dark:bg-slate-900 rounded shadow-lg p-2 text-sm transition-opacity z-10">
                      <h4 className="font-bold">{trail.name}</h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{trail.location}</p>
                      <div className="flex justify-between mt-1 text-xs">
                        <span>{trail.distance} miles</span>
                        <span>{trail.difficulty}</span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="p-4 border-t dark:border-slate-700">
              <h3 className="font-medium mb-2">Nearby Trails</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {filteredTrails.slice(0, 3).map((trail) => (
                  <div
                    key={trail.id}
                    className="flex items-center gap-3 p-2 rounded hover:bg-gray-50 dark:hover:bg-slate-700"
                  >
                    <div className={`h-3 w-3 rounded-full ${getDifficultyColor(trail.difficulty)}`}></div>
                    <div>
                      <h4 className="font-medium text-sm">{trail.name}</h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{trail.distance} miles</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="bg-white dark:bg-slate-900 border-t dark:border-slate-800 mt-auto">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center">
              <Compass className="h-6 w-6 text-green-600 dark:text-green-400 mr-2" />
              <span className="font-medium">TrailFinder</span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Find your next adventure on the trails near you</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

