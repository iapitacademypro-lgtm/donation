"use client"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { Label } from "@/app/components/ui/label"
import { Badge } from "@/app/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/app/components/ui/dialog"
import { Alert, AlertDescription } from "@/app/components/ui/alert"
import {
  Search,
  Download,
  Eye,
  DollarSign,
  Users,
  CheckCircle,
  XCircle,
  Clock,
  Trash2,
  Shield,
  AlertTriangle,
  Settings,
  Key,
} from "lucide-react"

interface DonationRecord {
  id: string
  donationType: string
  amount: number
  totalAmount: number
  timestamp: string
  status: string
  fullName?: string
  whatsappNumber?: string
  emailAddress?: string
  requiresVideo?: string
  acknowledgeLogistics?: boolean
  acknowledgeRemainingFunds?: boolean
  animalCounts?: Record<string, number>
  wealthAmount?: number
  calculatedZakah?: number
  wantsNameplate?: boolean
  nameplateText?: string
  mealCount?: number
  donationPurpose?: string //new field for donation purpose
}

interface AuthState {
  isAuthenticated: boolean
  isLocked: boolean
  failedAttempts: number
  lockoutUntil: number | null
  lastFailedAttempt: number | null
}

export default function AdminDashboard() {
  const [donations, setDonations] = useState<DonationRecord[]>([])
  const [filteredDonations, setFilteredDonations] = useState<DonationRecord[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [selectedDonation, setSelectedDonation] = useState<DonationRecord | null>(null)
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null)

  // Authentication state
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    isLocked: false,
    failedAttempts: 0,
    lockoutUntil: null,
    lastFailedAttempt: null,
  })
  const [password, setPassword] = useState("")
  const [authError, setAuthError] = useState("")

  // Password change states
  const [showPasswordDialog, setShowPasswordDialog] = useState(false)
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [passwordChangeError, setPasswordChangeError] = useState("")
  const [passwordChangeSuccess, setPasswordChangeSuccess] = useState("")

  // Get admin password from localStorage or use default
  const getAdminPassword = () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("adminPassword") || "Ya@Attar786"
    }
    return "Ya@Attar786"
  }

  const [adminPassword, setAdminPassword] = useState(getAdminPassword())

  const MAX_ATTEMPTS = 3
  const LOCKOUT_DURATION = 10 * 60 * 1000 // 10 minutes

  // Check if account is currently locked
  const checkLockoutStatus = () => {
    const now = Date.now()
    if (authState.lockoutUntil && now < authState.lockoutUntil) {
      const remainingTime = Math.ceil((authState.lockoutUntil - now) / 1000 / 60)
      return { isLocked: true, remainingMinutes: remainingTime }
    }
    return { isLocked: false, remainingMinutes: 0 }
  }

  // Handle login attempt
  const handleLogin = () => {
    const now = Date.now()
    const lockoutStatus = checkLockoutStatus()

    if (lockoutStatus.isLocked) {
      setAuthError(`Account locked. Please try again in ${lockoutStatus.remainingMinutes} minutes.`)
      return
    }

    if (password === adminPassword) {
      setAuthState({
        isAuthenticated: true,
        isLocked: false,
        failedAttempts: 0,
        lockoutUntil: null,
        lastFailedAttempt: null,
      })
      setAuthError("")
      setPassword("")
    } else {
      const newFailedAttempts = authState.failedAttempts + 1
      if (newFailedAttempts >= MAX_ATTEMPTS) {
        const lockoutUntil = now + LOCKOUT_DURATION
        setAuthState({
          ...authState,
          failedAttempts: newFailedAttempts,
          isLocked: true,
          lockoutUntil,
          lastFailedAttempt: now,
        })
        setAuthError("Too many failed attempts. Account locked for 10 minutes.")
      } else {
        setAuthState({
          ...authState,
          failedAttempts: newFailedAttempts,
          lastFailedAttempt: now,
        })
        setAuthError(`Invalid password. ${MAX_ATTEMPTS - newFailedAttempts} attempts remaining.`)
      }
      setPassword("")
    }
  }

  // Handle logout
  const handleLogout = () => {
    setAuthState({
      isAuthenticated: false,
      isLocked: false,
      failedAttempts: 0,
      lockoutUntil: null,
      lastFailedAttempt: null,
    })
    setPassword("")
    setAuthError("")
  }

  // Handle password change
  const handlePasswordChange = () => {
    setPasswordChangeError("")
    setPasswordChangeSuccess("")

    // Validation
    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordChangeError("All fields are required.")
      return
    }

    if (currentPassword !== adminPassword) {
      setPasswordChangeError("Current password is incorrect.")
      return
    }

    if (newPassword.length < 6) {
      setPasswordChangeError("New password must be at least 6 characters long.")
      return
    }

    if (newPassword !== confirmPassword) {
      setPasswordChangeError("New passwords do not match.")
      return
    }

    if (newPassword === currentPassword) {
      setPasswordChangeError("New password must be different from current password.")
      return
    }

    // Save new password
    if (typeof window !== "undefined") {
      localStorage.setItem("adminPassword", newPassword)
    }
    setAdminPassword(newPassword)
    setPasswordChangeSuccess("Password changed successfully!")

    // Clear form
    setCurrentPassword("")
    setNewPassword("")
    setConfirmPassword("")

    // Close dialog after 2 seconds
    setTimeout(() => {
      setShowPasswordDialog(false)
      setPasswordChangeSuccess("")
    }, 2000)
  }

   // Fetch real data from API
   useEffect(() => {
    async function fetchDonations() {
      try {
        const res = await fetch("/api/donations");
        if (!res.ok) throw new Error("Failed to fetch donations");
        const data = await res.json();
        console.log("Fetched donations:", data); // Debug log
        setDonations(Array.isArray(data) ? data : []);
        setFilteredDonations(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetching donations:", err);
        // Only set empty arrays on error, no sample data
        setDonations([]);
        setFilteredDonations([]);
      }
    }
    fetchDonations();
  }, []);

  // Filter donations effect
  useEffect(() => {
    let filtered = [...donations] // Create a copy to avoid mutation

    // Search filter - improved with trim and better null checking
    if (searchTerm && searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase().trim()
      filtered = filtered.filter(
        (donation) =>
          (donation.fullName && donation.fullName.toLowerCase().includes(searchLower)) ||
          (donation.emailAddress && donation.emailAddress.toLowerCase().includes(searchLower)) ||
          (donation.donationType && donation.donationType.toLowerCase().includes(searchLower)),
      )
    }

    // Status filter - improved with better comparison
    if (statusFilter && statusFilter !== "all") {
      filtered = filtered.filter(
        (donation) => donation.status && donation.status.toLowerCase() === statusFilter.toLowerCase(),
      )
    }

    // Type filter - improved with better comparison
    if (typeFilter && typeFilter !== "all") {
      filtered = filtered.filter(
        (donation) => donation.donationType && donation.donationType.toLowerCase() === typeFilter.toLowerCase(),
      )
    }

    setFilteredDonations(filtered)
  }, [donations, searchTerm, statusFilter, typeFilter])

  // Debug function to check filtering
  useEffect(() => {
    console.log("Filter Debug:", {
      totalDonations: donations.length,
      filteredDonations: filteredDonations.length,
      searchTerm,
      statusFilter,
      typeFilter,
      sampleDonation: donations[0],
    })
  }, [donations, filteredDonations, searchTerm, statusFilter, typeFilter])

  // Delete donation function
  const deleteDonation = (id: string) => {
    setDonations((prev) => prev.filter((donation) => donation.id !== id))
    setDeleteConfirmId(null)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 border-green-200"
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "failed":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4" />
      case "pending":
        return <Clock className="h-4 w-4" />
      case "failed":
        return <XCircle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const getDonationTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      meal: "Meal Donation",
      sadqah: "Sadaqah",
      zakah: "Zakah",
      "water-handpump": "Water Handpump",
      animals: "Qurbani/Animals",
      emergency: "Emergency Relief",
      maizeflour: "Maize Flour",
      specialevent: "Special Event",
      phillipne_mouque: "Philippines Mosque",
      phillipne_floods: "Philippines Flood Relief",
      meal_distribution: "Meal Distribution (Philippines)",
    }
    return labels[type] || type
  }

  const calculateStats = () => {
    const totalDonations = donations.length
    const totalAmount = donations.reduce((sum, d) => sum + d.totalAmount, 0)
    const completedDonations = donations.filter((d) => d.status === "completed").length
    const pendingDonations = donations.filter((d) => d.status === "pending").length

    return {
      totalDonations,
      totalAmount,
      completedDonations,
      pendingDonations,
    }
  }

  const exportToCSV = () => {
    const headers = ["ID", "Type", "Purpose", "Donor Name", "Email", "WhatsApp", "Amount", "Status", "Date"]

    const csvData = filteredDonations.map((donation) => [
      donation.id,
      getDonationTypeLabel(donation.donationType),
      donation.donationPurpose || "", 
      donation.fullName || "",
      donation.emailAddress || "",
      donation.whatsappNumber || "",
      `$${donation.totalAmount}`,
      donation.status,
      new Date(donation.timestamp).toLocaleDateString(),
    ])

    const csvContent = [headers, ...csvData].map((row) => row.map((field) => `"${field}"`).join(",")).join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `donations-export-${Date.now()}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const updateDonationStatus = (id: string, newStatus: "pending" | "completed" | "failed") => {
    setDonations((prev) => prev.map((donation) => (donation.id === id ? { ...donation, status: newStatus } : donation)))
  }

  // Login form
  if (!authState.isAuthenticated) {
    const lockoutStatus = checkLockoutStatus()

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 p-3 bg-blue-100 rounded-full w-fit">
              <Shield className="h-8 w-8 text-blue-600" />
            </div>
            <CardTitle className="text-2xl font-bold text-blue-700">Admin Access</CardTitle>
            <p className="text-blue-600">Enter your password to access the dashboard</p>
          </CardHeader>
          <CardContent className="space-y-4">
            {authError && (
              <Alert variant={lockoutStatus.isLocked ? "destructive" : "default"}>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>{authError}</AlertDescription>
              </Alert>
            )}
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && !lockoutStatus.isLocked && handleLogin()}
                disabled={lockoutStatus.isLocked}
                placeholder="Enter admin password"
              />
            </div>
            <Button onClick={handleLogin} className="w-full" disabled={lockoutStatus.isLocked || !password.trim()}>
              {lockoutStatus.isLocked ? `Locked (${lockoutStatus.remainingMinutes}m)` : "Login"}
            </Button>
            <div className="text-center text-sm text-blue-600">
              <p>
                Failed attempts: {authState.failedAttempts}/{MAX_ATTEMPTS}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const stats = calculateStats()

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-blue-700 mb-2">Admin Dashboard</h1>
          <p className="text-blue-600">Manage and monitor all donations</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-green-600">
            <Shield className="h-5 w-5" />
            <span className="text-sm font-medium">Authenticated as Admin</span>
          </div>

          {/* Password Change Dialog */}
          <Dialog open={showPasswordDialog} onOpenChange={setShowPasswordDialog}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-blue-700">
                  <Key className="h-5 w-5" />
                  Change Password
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                {passwordChangeError && (
                  <Alert variant="destructive">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>{passwordChangeError}</AlertDescription>
                  </Alert>
                )}
                {passwordChangeSuccess && (
                  <Alert className="border-green-200 bg-green-50">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <AlertDescription className="text-green-700">{passwordChangeSuccess}</AlertDescription>
                  </Alert>
                )}
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input
                    id="current-password"
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="Enter current password"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input
                    id="new-password"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password (min 6 characters)"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm new password"
                  />
                </div>
                <div className="flex gap-2 justify-end pt-4">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setShowPasswordDialog(false)
                      setCurrentPassword("")
                      setNewPassword("")
                      setConfirmPassword("")
                      setPasswordChangeError("")
                      setPasswordChangeSuccess("")
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handlePasswordChange}
                    disabled={!currentPassword || !newPassword || !confirmPassword}
                  >
                    Change Password
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <Button onClick={handleLogout} variant="outline">
            Logout
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">Total Donations</p>
                <p className="text-2xl font-bold text-blue-700">{stats.totalDonations}</p>
              </div>
              <Users className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">Total Amount</p>
                <p className="text-2xl font-bold text-blue-700">${stats.totalAmount.toLocaleString()}</p>
              </div>
              <DollarSign className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">Completed</p>
                <p className="text-2xl font-bold text-green-700">{stats.completedDonations}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">Pending</p>
                <p className="text-2xl font-bold text-yellow-700">{stats.pendingDonations}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4 items-end">
            <div className="flex-1">
              <Label htmlFor="search">Search Donations</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="search"
                  placeholder="Search by name, email, or type..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white"
                />
              </div>
            </div>
            <div>
              <Label>Status</Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                  
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Type</Label>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="meal">Meals</SelectItem>
                  <SelectItem value="sadqah">Sadaqah</SelectItem>
                  <SelectItem value="zakah">Zakah</SelectItem>
                  <SelectItem value="water-handpump">Water Handpump</SelectItem>
                  <SelectItem value="animals">Qurbani</SelectItem>
                  <SelectItem value="emergency">Emergency</SelectItem>
                   {/* //new options for donation purpose */}
                  <SelectItem value="maizeflour">Maize Flour</SelectItem>
                  <SelectItem value="specialevent">Special Event</SelectItem>

                </SelectContent>
              </Select>
            </div>
            <Button onClick={exportToCSV} variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Donations Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-blue-700">Donations ({filteredDonations.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-blue-200">
                  <th className="text-left p-4 font-medium text-blue-700">Donor</th>
                  <th className="text-left p-4 font-medium text-blue-700">Type</th>
                  <th className="text-left p-4 font-medium text-blue-700">Amount</th>
                  <th className="text-left p-4 font-medium text-blue-700">Status</th>
                  <th className="text-left p-4 font-medium text-blue-700">Date</th>
                  <th className="text-left p-4 font-medium text-blue-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredDonations.map((donation) => (
                  <tr key={donation.id} className="border-b border-gray-100 hover:bg-blue-50">
                    <td className="p-4">
                      <div>
                        <p className="font-medium text-blue-700">{donation.fullName}</p>
                        <p className="text-sm text-blue-600">{donation.emailAddress}</p>
                      </div>
                    </td>
                    <td className="p-4">
                      <Badge variant="outline" className="border-blue-300 text-blue-700">
                        {getDonationTypeLabel(donation.donationType)}
                      </Badge>
                      {/* New for donation type. */}
                       {donation.donationPurpose && (
                          <Badge variant="outline" className="ml-2 border-yellow-300 text-yellow-700">
                             {donation.donationPurpose}
                          </Badge>
                          )}
                    </td>


                    <td className="p-4">
                      <p className="font-medium text-yellow-600">${donation.totalAmount}</p>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(donation.status)}
                        <Badge className={getStatusColor(donation.status)}>{donation.status}</Badge>
                      </div>
                    </td>
                    <td className="p-4">
                      <p className="text-sm text-blue-600">{new Date(donation.timestamp).toLocaleDateString()}</p>
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        {/* View Button */}
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setSelectedDonation(donation)}
                              className="hover:border-blue-400 hover:bg-blue-50"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle className="text-blue-700">Donation Details</DialogTitle>
                            </DialogHeader>
                            {selectedDonation && (
                              <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <Label className="text-blue-700">Donor Name</Label>
                                    <p className="font-medium">{selectedDonation.fullName}</p>
                                  </div>
                                  <div>
                                    <Label className="text-blue-700">Donation Type</Label>
                                    <p className="font-medium">{getDonationTypeLabel(selectedDonation.donationType)}</p>
                                  </div>
                                   
                                       {selectedDonation.donationPurpose && (
                                          <div>
                                              <Label className="text-blue-700">Donation Purpose</Label>
                                           <p className="font-medium">{selectedDonation.donationPurpose}</p>
                                           </div>
                                        )}
                                
                                  <div>
                                    <Label className="text-blue-700">Email</Label>
                                    <p className="font-medium">{selectedDonation.emailAddress}</p>
                                  </div>
                                  <div>
                                    <Label className="text-blue-700">WhatsApp</Label>
                                    <p className="font-medium">{selectedDonation.whatsappNumber}</p>
                                  </div>
                                  <div>
                                    <Label className="text-blue-700">Amount</Label>
                                    <p className="font-medium text-yellow-600">${selectedDonation.totalAmount}</p>
                                  </div>
                                  <div>
                                    <Label className="text-blue-700">Status</Label>
                                    <div className="flex items-center gap-2">
                                      <Badge className={getStatusColor(selectedDonation.status)}>
                                        {selectedDonation.status}
                                      </Badge>
                                    </div>
                                  </div>
                                </div>

                                {/* Type-specific details */}
                                {selectedDonation.donationType === "animals" && selectedDonation.animalCounts && (
                                  <div>
                                    <Label className="text-blue-700">Qurbani Details</Label>
                                    <div className="bg-yellow-50 p-4 rounded-lg mt-2">
                                      <div className="mb-2">
                                        <p className="font-medium">Animals:</p>
                                        {Object.entries(selectedDonation.animalCounts).map(([animal, count]) => (
                                          <p key={animal} className="text-sm">
                                            • {animal}: {count}
                                          </p>
                                        ))}
                                      </div>
                                      <p className="text-sm">Video Required: {selectedDonation.requiresVideo}</p>
                                      <p className="text-sm">
                                        Logistics Acknowledged: {selectedDonation.acknowledgeLogistics ? "Yes" : "No"}
                                      </p>
                                      <p className="text-sm">
                                        Remaining Funds Acknowledged:{" "}
                                        {selectedDonation.acknowledgeRemainingFunds ? "Yes" : "No"}
                                      </p>
                                    </div>
                                  </div>
                                )}

                                {selectedDonation.donationType === "zakah" && (
                                  <div>
                                    <Label className="text-blue-700">Zakah Calculation</Label>
                                    <div className="bg-blue-50 p-4 rounded-lg mt-2">
                                      <p className="text-sm">Total Wealth: ${selectedDonation.wealthAmount}</p>
                                      <p className="text-sm">
                                        Calculated Zakah (2.5%): ${selectedDonation.calculatedZakah}
                                      </p>
                                    </div>
                                  </div>
                                )}

                                {selectedDonation.donationType === "water-handpump" && (
                                  <div>
                                    <Label className="text-blue-700">Water Project Details</Label>
                                    <div className="bg-blue-50 p-4 rounded-lg mt-2">
                                      <p className="text-sm">
                                        Nameplate Requested: {selectedDonation.wantsNameplate ? "Yes" : "No"}
                                      </p>
                                      {selectedDonation.nameplateText && (
                                        <p className="text-sm">Nameplate Text: "{selectedDonation.nameplateText}"</p>
                                      )}
                                    </div>
                                  </div>
                                )}

                                {selectedDonation.donationType === "meal" && (
                                  <div>
                                    <Label className="text-blue-700">Meal Details</Label>
                                    <div className="bg-green-50 p-4 rounded-lg mt-2">
                                      <p className="text-sm">Number of People to Feed: {selectedDonation.mealCount}</p>
                                    </div>
                                  </div>
                                )}

                                <div className="flex gap-2 pt-4">
                                  <Button
                                    size="sm"
                                    onClick={() => updateDonationStatus(selectedDonation.id, "completed")}
                                    className="bg-green-600 hover:bg-green-700"
                                  >
                                    Mark Completed
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => updateDonationStatus(selectedDonation.id, "pending")}
                                  >
                                    Mark Pending
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="destructive"
                                    onClick={() => updateDonationStatus(selectedDonation.id, "failed")}
                                  >
                                    Mark Failed
                                  </Button>
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>

                        {/* Status Select */}
                        <Select
                          value={donation.status}
                          onValueChange={(value: "pending" | "completed" | "failed") =>
                            updateDonationStatus(donation.id, value)
                          }
                        >
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-white">
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                            <SelectItem value="failed">Failed</SelectItem>
                          </SelectContent>
                        </Select>

                        {/* Delete Button with proper hover styling */}
                        <Dialog
                          open={deleteConfirmId === donation.id}
                          onOpenChange={(open) => !open && setDeleteConfirmId(null)}
                        >
                          <DialogTrigger asChild>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => setDeleteConfirmId(donation.id)}
                              className="hover:border-red-600 hover:border-2 hover:bg-red-600 transition-all duration-200"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle className="text-red-700">Confirm Deletion</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                              <p>Are you sure you want to delete this donation record?</p>
                              <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                                <p className="font-medium">Donor: {donation.fullName}</p>
                                <p className="text-sm">Amount: ${donation.totalAmount}</p>
                                <p className="text-sm">Type: {getDonationTypeLabel(donation.donationType)}</p>
                              </div>
                              <Alert variant="destructive">
                                <AlertTriangle className="h-4 w-4" />
                                <AlertDescription>
                                  This action cannot be undone. The donation record will be permanently deleted.
                                </AlertDescription>
                              </Alert>
                              <div className="flex gap-2 justify-end">
                                <Button variant="outline" onClick={() => setDeleteConfirmId(null)}>
                                  Cancel
                                </Button>
                                <Button variant="destructive" onClick={() => deleteDonation(donation.id)}>
                                  Delete Permanently
                                </Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredDonations.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">No donations found matching your criteria.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
