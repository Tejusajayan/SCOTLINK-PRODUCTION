import { useState, useEffect } from "react";
import { useLocation, Link } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import {
  Anchor,
  LogOut,
  Settings,
  Image,
  Users,
  Mail,
  Plus,
  Trash2,
  Download,
  Edit,
  Loader2,
  Package,
  UserPlus,
  Key
} from "lucide-react";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { Service, GalleryImage, ClientLogo, ContactSubmission } from "@shared/schema";

function getAuthHeaders() {
  const token = localStorage.getItem("adminToken");
  return {
    Authorization: `Bearer ${token}`,
  };
}

export default function AdminDashboard() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("services");

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      setLocation("/vscolog");
    }
  }, [setLocation]);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    setLocation("/vscolog");
  };

  const { data: services, isLoading: servicesLoading } = useQuery<Service[]>({
    queryKey: ["/api/admin/services"],
    queryFn: async () => {
      const res = await fetch("/api/admin/services", { headers: getAuthHeaders() });
      if (!res.ok) throw new Error("Failed to fetch services");
      return res.json();
    },
  });

  const { data: galleryImages, isLoading: galleryLoading } = useQuery<GalleryImage[]>({
    queryKey: ["/api/admin/gallery"],
    queryFn: async () => {
      const res = await fetch("/api/admin/gallery", { headers: getAuthHeaders() });
      if (!res.ok) throw new Error("Failed to fetch gallery");
      return res.json();
    },
  });

  const { data: clientLogos, isLoading: logosLoading } = useQuery<ClientLogo[]>({
    queryKey: ["/api/admin/client-logos"],
    queryFn: async () => {
      const res = await fetch("/api/admin/client-logos", { headers: getAuthHeaders() });
      if (!res.ok) throw new Error("Failed to fetch logos");
      return res.json();
    },
  });

  const { data: submissions, isLoading: submissionsLoading } = useQuery<ContactSubmission[]>({
    queryKey: ["/api/admin/contact-submissions"],
    queryFn: async () => {
      const res = await fetch("/api/admin/contact-submissions", { headers: getAuthHeaders() });
      if (!res.ok) throw new Error("Failed to fetch submissions");
      return res.json();
    },
  });

  const deleteSubmissionMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/admin/contact-submissions/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });
      if (!res.ok) throw new Error("Failed to delete");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/contact-submissions"] });
      toast({ title: "Submission deleted" });
    },
  });

  const exportCSV = () => {
    if (!submissions) return;
    const headers = ["Name", "Email", "Phone", "Message", "Date"];
    const rows = submissions.map((s) => [
      s.name,
      s.email,
      s.phone,
      s.message.replace(/,/g, ";"),
      new Date(s.createdAt).toLocaleString(),
    ]);
    const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "contact_submissions.csv";
    a.click();
  };

  return (
    <div className="min-h-screen bg-muted/30" data-testid="page-admin-dashboard">
      <header className="bg-background border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Anchor className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <span className="font-bold text-foreground">Scotlink Logistics</span>
                <span className="text-muted-foreground text-sm block">Admin Panel</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/">
                <Button variant="ghost" size="sm" data-testid="button-view-site">View Site</Button>
              </Link>
              <Button variant="outline" size="sm" onClick={handleLogout} className="gap-2" data-testid="button-logout">
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Services</CardTitle>
              <Settings className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{services?.length || 0}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Gallery Images</CardTitle>
              <Image className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{galleryImages?.length || 0}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Client Logos</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{clientLogos?.length || 0}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Messages</CardTitle>
              <Mail className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{submissions?.length || 0}</div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="services" className="gap-2" data-testid="tab-services">
              <Package className="w-4 h-4" />
              Services
            </TabsTrigger>
            <TabsTrigger value="gallery" className="gap-2" data-testid="tab-gallery">
              <Image className="w-4 h-4" />
              Gallery
            </TabsTrigger>
            <TabsTrigger value="logos" className="gap-2" data-testid="tab-logos">
              <Users className="w-4 h-4" />
              Client Logos
            </TabsTrigger>
            <TabsTrigger value="submissions" className="gap-2" data-testid="tab-submissions">
              <Mail className="w-4 h-4" />
              Contact Submissions
            </TabsTrigger>
            <TabsTrigger value="users" className="gap-2" data-testid="tab-users">
              <UserPlus className="w-4 h-4" />
              User Management
            </TabsTrigger>
          </TabsList>

          <TabsContent value="services">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between gap-4">
                <CardTitle>Manage Services</CardTitle>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm" className="gap-2" data-testid="button-add-service">
                      <Plus className="w-4 h-4" />
                      Add Service
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Create New Service</DialogTitle>
                    </DialogHeader>
                    <form
                      onSubmit={async (e) => {
                        e.preventDefault();
                        const formData = new FormData(e.currentTarget);

                        try {
                          const serviceData = {
                            slug: formData.get("slug") as string,
                            title: formData.get("title") as string,
                            shortDescription: formData.get("shortDescription") as string,
                            fullDescription: formData.get("fullDescription") as string,
                            importance: formData.get("importance") as string,
                            imageUrl: formData.get("imageUrl") as string,
                            workflowSteps: formData.get("workflowSteps") as string,
                            galleryImages: formData.get("galleryImages") as string,
                            features: formData.get("features") as string,
                            enabled: formData.get("enabled") === "on",
                            order: parseInt(formData.get("order") as string) || 0,
                          };

                          const res = await fetch("/api/admin/services", {
                            method: "POST",
                            headers: {
                              ...getAuthHeaders(),
                              "Content-Type": "application/json",
                            },
                            body: JSON.stringify(serviceData),
                          });

                          if (!res.ok) {
                            const error = await res.json();
                            throw new Error(error.error || "Failed to create service");
                          }

                          toast({ title: "Service created successfully" });
                          queryClient.invalidateQueries({ queryKey: ["/api/admin/services"] });
                          const form = e.currentTarget;
                          if (form) setTimeout(() => form.reset(), 0);
                        } catch (error: any) {
                          toast({
                            title: "Failed to create service",
                            description: error.message,
                            variant: "destructive"
                          });
                        }
                      }}
                      className="space-y-4"
                    >
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="title">Title *</Label>
                          <Input id="title" name="title" required placeholder="Service Title" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="slug">Slug *</Label>
                          <Input id="slug" name="slug" required placeholder="service-slug" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="shortDescription">Short Description *</Label>
                        <Textarea id="shortDescription" name="shortDescription" required placeholder="Brief description" />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="fullDescription">Full Description *</Label>
                        <Textarea id="fullDescription" name="fullDescription" required rows={4} placeholder="Detailed description" />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="importance">Importance *</Label>
                        <Textarea id="importance" name="importance" required placeholder="Why this service is important" />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="imageUrl">Image URL *</Label>
                        <Input id="imageUrl" name="imageUrl" required placeholder="https://..." />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="workflowSteps">Workflow Steps (JSON array) *</Label>
                        <Textarea id="workflowSteps" name="workflowSteps" required placeholder='[{"title": "Step 1", "description": "Details"}, {"title": "Step 2", "description": "Details"}]' rows={3} />
                        <p className="text-xs text-muted-foreground">Format: Array of objects with title and description</p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="galleryImages">Gallery Images (JSON array) *</Label>
                        <Textarea id="galleryImages" name="galleryImages" required placeholder='["url1", "url2"]' />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="features">Service Features (JSON array) *</Label>
                        <Textarea id="features" name="features" required placeholder='["Feature 1", "Feature 2", "Feature 3"]' rows={3} />
                        <p className="text-xs text-muted-foreground">List of service features/benefits</p>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="order">Display Order</Label>
                          <Input id="order" name="order" type="number" defaultValue="0" />
                        </div>
                        <div className="flex items-center space-x-2 pt-8">
                          <Switch id="enabled" name="enabled" defaultChecked />
                          <Label htmlFor="enabled">Enabled</Label>
                        </div>
                      </div>

                      <Button type="submit" className="w-full">Create Service</Button>
                    </form>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                {servicesLoading ? (
                  <div className="flex justify-center py-8">
                    <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
                  </div>
                ) : services && services.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Slug</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Order</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {services.map((service) => (
                        <TableRow key={service.id}>
                          <TableCell className="font-medium">{service.title}</TableCell>
                          <TableCell className="text-muted-foreground">{service.slug}</TableCell>
                          <TableCell>
                            <Switch
                              checked={service.enabled}
                              onCheckedChange={async (checked) => {
                                try {
                                  const res = await fetch(`/api/admin/services/${service.id}`, {
                                    method: "PATCH",
                                    headers: {
                                      ...getAuthHeaders(),
                                      "Content-Type": "application/json",
                                    },
                                    body: JSON.stringify({ enabled: checked }),
                                  });

                                  if (!res.ok) throw new Error("Failed to update service");

                                  toast({ title: `Service ${checked ? "enabled" : "disabled"}` });
                                  queryClient.invalidateQueries({ queryKey: ["/api/admin/services"] });
                                } catch (error) {
                                  toast({
                                    title: "Failed to update service",
                                    variant: "destructive"
                                  });
                                }
                              }}
                            />
                          </TableCell>
                          <TableCell>{service.order}</TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button variant="ghost" size="sm">
                                    <Edit className="w-4 h-4" />
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                                  <DialogHeader>
                                    <DialogTitle>Edit Service: {service.title}</DialogTitle>
                                  </DialogHeader>
                                  <form
                                    onSubmit={async (e) => {
                                      e.preventDefault();
                                      const formData = new FormData(e.currentTarget);

                                      try {
                                        const serviceData = {
                                          slug: formData.get("slug") as string,
                                          title: formData.get("title") as string,
                                          shortDescription: formData.get("shortDescription") as string,
                                          fullDescription: formData.get("fullDescription") as string,
                                          importance: formData.get("importance") as string,
                                          imageUrl: formData.get("imageUrl") as string,
                                          workflowSteps: formData.get("workflowSteps") as string,
                                          galleryImages: formData.get("galleryImages") as string,
                                          features: formData.get("features") as string,
                                          enabled: formData.get("enabled") === "on",
                                          order: parseInt(formData.get("order") as string) || 0,
                                        };

                                        const res = await fetch(`/api/admin/services/${service.id}`, {
                                          method: "PATCH",
                                          headers: {
                                            ...getAuthHeaders(),
                                            "Content-Type": "application/json",
                                          },
                                          body: JSON.stringify(serviceData),
                                        });

                                        if (!res.ok) {
                                          const error = await res.json();
                                          throw new Error(error.error || "Failed to update service");
                                        }

                                        toast({ title: "Service updated successfully" });
                                        queryClient.invalidateQueries({ queryKey: ["/api/admin/services"] });
                                      } catch (error: any) {
                                        toast({
                                          title: "Failed to update service",
                                          description: error.message,
                                          variant: "destructive"
                                        });
                                      }
                                    }}
                                    className="space-y-4"
                                  >
                                    <div className="grid grid-cols-2 gap-4">
                                      <div className="space-y-2">
                                        <Label htmlFor="edit-title">Title *</Label>
                                        <Input id="edit-title" name="title" required defaultValue={service.title} />
                                      </div>
                                      <div className="space-y-2">
                                        <Label htmlFor="edit-slug">Slug *</Label>
                                        <Input id="edit-slug" name="slug" required defaultValue={service.slug} />
                                      </div>
                                    </div>

                                    <div className="space-y-2">
                                      <Label htmlFor="edit-shortDescription">Short Description *</Label>
                                      <Textarea id="edit-shortDescription" name="shortDescription" required defaultValue={service.shortDescription} />
                                    </div>

                                    <div className="space-y-2">
                                      <Label htmlFor="edit-fullDescription">Full Description *</Label>
                                      <Textarea id="edit-fullDescription" name="fullDescription" required rows={4} defaultValue={service.fullDescription} />
                                    </div>

                                    <div className="space-y-2">
                                      <Label htmlFor="edit-importance">Importance *</Label>
                                      <Textarea id="edit-importance" name="importance" required defaultValue={service.importance} />
                                    </div>

                                    <div className="space-y-2">
                                      <Label htmlFor="edit-imageUrl">Image URL *</Label>
                                      <Input id="edit-imageUrl" name="imageUrl" required defaultValue={service.imageUrl} />
                                    </div>

                                    <div className="space-y-2">
                                      <Label htmlFor="edit-workflowSteps">Workflow Steps (JSON array) *</Label>
                                      <Textarea id="edit-workflowSteps" name="workflowSteps" required defaultValue={service.workflowSteps} rows={3} />
                                      <p className="text-xs text-muted-foreground">Format: Array of objects with title and description</p>
                                    </div>

                                    <div className="space-y-2">
                                      <Label htmlFor="edit-galleryImages">Gallery Images (JSON array) *</Label>
                                      <Textarea id="edit-galleryImages" name="galleryImages" required defaultValue={service.galleryImages} />
                                    </div>

                                    <div className="space-y-2">
                                      <Label htmlFor="edit-features">Service Features (JSON array) *</Label>
                                      <Textarea id="edit-features" name="features" required defaultValue={service.features || "[]"} rows={3} />
                                      <p className="text-xs text-muted-foreground">List of service features/benefits</p>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                      <div className="space-y-2">
                                        <Label htmlFor="edit-order">Display Order</Label>
                                        <Input id="edit-order" name="order" type="number" defaultValue={service.order} />
                                      </div>
                                      <div className="flex items-center space-x-2 pt-8">
                                        <Switch id="edit-enabled" name="enabled" defaultChecked={service.enabled} />
                                        <Label htmlFor="edit-enabled">Enabled</Label>
                                      </div>
                                    </div>

                                    <Button type="submit" className="w-full">Update Service</Button>
                                  </form>
                                </DialogContent>
                              </Dialog>

                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button variant="ghost" size="sm">
                                    <Trash2 className="w-4 h-4 text-destructive" />
                                  </Button>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>Delete Service</DialogTitle>
                                  </DialogHeader>
                                  <p className="text-muted-foreground">
                                    Are you sure you want to delete "{service.title}"? This action cannot be undone.
                                  </p>
                                  <div className="flex gap-2 justify-end mt-4">
                                    <DialogTrigger asChild>
                                      <Button variant="outline">Cancel</Button>
                                    </DialogTrigger>
                                    <Button
                                      variant="destructive"
                                      onClick={async () => {
                                        try {
                                          const res = await fetch(`/api/admin/services/${service.id}`, {
                                            method: "DELETE",
                                            headers: getAuthHeaders(),
                                          });

                                          if (!res.ok) throw new Error("Failed to delete service");

                                          toast({ title: "Service deleted successfully" });
                                          queryClient.invalidateQueries({ queryKey: ["/api/admin/services"] });
                                        } catch (error) {
                                          toast({
                                            title: "Failed to delete service",
                                            variant: "destructive"
                                          });
                                        }
                                      }}
                                    >
                                      Delete
                                    </Button>
                                  </div>
                                </DialogContent>
                              </Dialog>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <p className="text-center text-muted-foreground py-8">
                    No services configured. Click "Add Service" to create one.
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="gallery">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between gap-4">
                <CardTitle>Gallery Images</CardTitle>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm" className="gap-2" data-testid="button-add-image">
                      <Plus className="w-4 h-4" />
                      Add Image
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add Gallery Image</DialogTitle>
                    </DialogHeader>
                    <form
                      onSubmit={async (e) => {
                        e.preventDefault();
                        const formData = new FormData(e.currentTarget);

                        try {
                          const imageData = {
                            imageUrl: formData.get("imageUrl") as string,
                            caption: formData.get("caption") as string || null,
                            category: formData.get("category") as string,
                            order: parseInt(formData.get("order") as string) || 0,
                          };

                          const res = await fetch("/api/admin/gallery", {
                            method: "POST",
                            headers: {
                              ...getAuthHeaders(),
                              "Content-Type": "application/json",
                            },
                            body: JSON.stringify(imageData),
                          });

                          if (!res.ok) {
                            const error = await res.json();
                            throw new Error(error.error || "Failed to add image");
                          }

                          toast({ title: "Gallery image added successfully" });
                          queryClient.invalidateQueries({ queryKey: ["/api/admin/gallery"] });
                          const form = e.currentTarget;
                          if (form) setTimeout(() => form.reset(), 0);
                        } catch (error: any) {
                          toast({
                            title: "Failed to add image",
                            description: error.message,
                            variant: "destructive"
                          });
                        }
                      }}
                      className="space-y-4"
                    >
                      <div className="space-y-2">
                        <Label htmlFor="gallery-imageUrl">Image URL *</Label>
                        <Input id="gallery-imageUrl" name="imageUrl" required placeholder="https://..." />
                        <p className="text-xs text-muted-foreground">Recommended: 1200x800px (3:2 ratio)</p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="gallery-caption">Caption (Optional)</Label>
                        <Input id="gallery-caption" name="caption" placeholder="Image description" />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="gallery-category">Category *</Label>
                        <Input id="gallery-category" name="category" required placeholder="e.g., Projects, Equipment" />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="gallery-order">Display Order</Label>
                        <Input id="gallery-order" name="order" type="number" defaultValue="0" />
                      </div>

                      <Button type="submit" className="w-full">Add Image</Button>
                    </form>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                {galleryLoading ? (
                  <div className="flex justify-center py-8">
                    <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
                  </div>
                ) : galleryImages && galleryImages.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {galleryImages.map((image) => (
                      <div key={image.id} className="relative group rounded-lg overflow-hidden">
                        <img src={image.imageUrl} alt={image.caption || ""} className="w-full aspect-square object-cover" />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="destructive" size="icon">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Delete Gallery Image</DialogTitle>
                              </DialogHeader>
                              <p className="text-muted-foreground">
                                Are you sure you want to delete this image? This action cannot be undone.
                              </p>
                              <div className="flex gap-2 justify-end mt-4">
                                <DialogTrigger asChild>
                                  <Button variant="outline">Cancel</Button>
                                </DialogTrigger>
                                <Button
                                  variant="destructive"
                                  onClick={async () => {
                                    try {
                                      const res = await fetch(`/api/admin/gallery/${image.id}`, {
                                        method: "DELETE",
                                        headers: getAuthHeaders(),
                                      });

                                      if (!res.ok) throw new Error("Failed to delete image");

                                      toast({ title: "Gallery image deleted successfully" });
                                      queryClient.invalidateQueries({ queryKey: ["/api/admin/gallery"] });
                                    } catch (error) {
                                      toast({
                                        title: "Failed to delete image",
                                        variant: "destructive"
                                      });
                                    }
                                  }}
                                >
                                  Delete
                                </Button>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-muted-foreground py-8">
                    No gallery images yet. Add images to display them on the website.
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="logos">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between gap-4">
                <CardTitle>Client Logos</CardTitle>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm" className="gap-2" data-testid="button-add-logo">
                      <Plus className="w-4 h-4" />
                      Add Logo
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add Client Logo</DialogTitle>
                    </DialogHeader>
                    <form
                      onSubmit={async (e) => {
                        e.preventDefault();
                        const formData = new FormData(e.currentTarget);

                        try {
                          const logoData = {
                            name: formData.get("name") as string,
                            imageUrl: formData.get("imageUrl") as string,
                            order: parseInt(formData.get("order") as string) || 0,
                          };

                          const res = await fetch("/api/admin/client-logos", {
                            method: "POST",
                            headers: {
                              ...getAuthHeaders(),
                              "Content-Type": "application/json",
                            },
                            body: JSON.stringify(logoData),
                          });

                          if (!res.ok) {
                            const error = await res.json();
                            throw new Error(error.error || "Failed to add logo");
                          }

                          toast({ title: "Client logo added successfully" });
                          queryClient.invalidateQueries({ queryKey: ["/api/admin/client-logos"] });
                          const form = e.currentTarget;
                          if (form) setTimeout(() => form.reset(), 0);
                        } catch (error: any) {
                          toast({
                            title: "Failed to add logo",
                            description: error.message,
                            variant: "destructive"
                          });
                        }
                      }}
                      className="space-y-4"
                    >
                      <div className="space-y-2">
                        <Label htmlFor="logo-name">Client Name *</Label>
                        <Input id="logo-name" name="name" required placeholder="Company Name" />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="logo-imageUrl">Logo URL *</Label>
                        <Input id="logo-imageUrl" name="imageUrl" required placeholder="https://..." />
                        <p className="text-xs text-muted-foreground">Recommended: 400x200px (2:1 ratio, transparent background)</p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="logo-order">Display Order</Label>
                        <Input id="logo-order" name="order" type="number" defaultValue="0" />
                      </div>

                      <Button type="submit" className="w-full">Add Logo</Button>
                    </form>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                {logosLoading ? (
                  <div className="flex justify-center py-8">
                    <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
                  </div>
                ) : clientLogos && clientLogos.length > 0 ? (
                  <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                    {clientLogos.map((logo) => (
                      <div key={logo.id} className="relative group p-4 border rounded-lg">
                        <img src={logo.imageUrl} alt={logo.name} className="w-full h-12 object-contain" />
                        <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="destructive" size="icon">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Delete Client Logo</DialogTitle>
                              </DialogHeader>
                              <p className="text-muted-foreground">
                                Are you sure you want to delete "{logo.name}"? This action cannot be undone.
                              </p>
                              <div className="flex gap-2 justify-end mt-4">
                                <DialogTrigger asChild>
                                  <Button variant="outline">Cancel</Button>
                                </DialogTrigger>
                                <Button
                                  variant="destructive"
                                  onClick={async () => {
                                    try {
                                      const res = await fetch(`/api/admin/client-logos/${logo.id}`, {
                                        method: "DELETE",
                                        headers: getAuthHeaders(),
                                      });

                                      if (!res.ok) throw new Error("Failed to delete logo");

                                      toast({ title: "Client logo deleted successfully" });
                                      queryClient.invalidateQueries({ queryKey: ["/api/admin/client-logos"] });
                                    } catch (error) {
                                      toast({
                                        title: "Failed to delete logo",
                                        variant: "destructive"
                                      });
                                    }
                                  }}
                                >
                                  Delete
                                </Button>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-muted-foreground py-8">
                    No client logos yet. Add logos to display them in the carousel.
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="submissions">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between gap-4">
                <CardTitle>Contact Submissions</CardTitle>
                <Button size="sm" variant="outline" className="gap-2" onClick={exportCSV} data-testid="button-export-csv">
                  <Download className="w-4 h-4" />
                  Export CSV
                </Button>
              </CardHeader>
              <CardContent>
                {submissionsLoading ? (
                  <div className="flex justify-center py-8">
                    <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
                  </div>
                ) : submissions && submissions.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {submissions.map((submission) => (
                        <TableRow key={submission.id}>
                          <TableCell className="font-medium">{submission.name}</TableCell>
                          <TableCell>{submission.email}</TableCell>
                          <TableCell>{submission.phone}</TableCell>
                          <TableCell>{new Date(submission.createdAt).toLocaleDateString()}</TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button variant="ghost" size="sm">View</Button>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>Message from {submission.name}</DialogTitle>
                                  </DialogHeader>
                                  <div className="space-y-4">
                                    <div>
                                      <Label>Email</Label>
                                      <p className="text-muted-foreground">{submission.email}</p>
                                    </div>
                                    <div>
                                      <Label>Phone</Label>
                                      <p className="text-muted-foreground">{submission.phone}</p>
                                    </div>
                                    <div>
                                      <Label>Message</Label>
                                      <p className="text-muted-foreground">{submission.message}</p>
                                    </div>
                                    <div>
                                      <Label>Received</Label>
                                      <p className="text-muted-foreground">
                                        {new Date(submission.createdAt).toLocaleString()}
                                      </p>
                                    </div>
                                  </div>
                                </DialogContent>
                              </Dialog>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => deleteSubmissionMutation.mutate(submission.id)}
                              >
                                <Trash2 className="w-4 h-4 text-destructive" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <p className="text-center text-muted-foreground py-8">
                    No contact submissions yet.
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <UserPlus className="w-5 h-5" />
                    Create Admin User
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form
                    onSubmit={async (e) => {
                      e.preventDefault();
                      const formData = new FormData(e.currentTarget);
                      const username = formData.get("username") as string;
                      const password = formData.get("password") as string;
                      const confirmPassword = formData.get("confirmPassword") as string;

                      if (password !== confirmPassword) {
                        toast({ title: "Passwords do not match", variant: "destructive" });
                        return;
                      }

                      try {
                        const res = await fetch("/api/admin/users", {
                          method: "POST",
                          headers: {
                            ...getAuthHeaders(),
                            "Content-Type": "application/json",
                          },
                          body: JSON.stringify({ username, password, role: "admin" }),
                        });

                        if (!res.ok) {
                          const error = await res.json();
                          throw new Error(error.error || "Failed to create user");
                        }

                        toast({ title: "Admin user created successfully" });
                        const form = e.currentTarget;
                        if (form) setTimeout(() => form.reset(), 0);
                      } catch (error: any) {
                        toast({
                          title: "Failed to create user",
                          description: error.message,
                          variant: "destructive"
                        });
                      }
                    }}
                    className="space-y-4"
                  >
                    <div className="space-y-2">
                      <Label htmlFor="username">Username</Label>
                      <Input
                        id="username"
                        name="username"
                        type="text"
                        required
                        placeholder="Enter username"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        required
                        placeholder="Enter password"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm Password</Label>
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        required
                        placeholder="Confirm password"
                      />
                    </div>
                    <Button type="submit" className="w-full gap-2">
                      <UserPlus className="w-4 h-4" />
                      Create Admin User
                    </Button>
                  </form>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Key className="w-5 h-5" />
                    Change Password
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form
                    onSubmit={async (e) => {
                      e.preventDefault();
                      const formData = new FormData(e.currentTarget);
                      const currentPassword = formData.get("currentPassword") as string;
                      const newPassword = formData.get("newPassword") as string;
                      const confirmNewPassword = formData.get("confirmNewPassword") as string;

                      if (newPassword !== confirmNewPassword) {
                        toast({ title: "New passwords do not match", variant: "destructive" });
                        return;
                      }

                      try {
                        // Get current user ID from token (you'll need to decode it or get it from an API)
                        const userRes = await fetch("/api/user", { headers: getAuthHeaders() });
                        if (!userRes.ok) throw new Error("Failed to get user info");
                        const userData = await userRes.json();

                        const res = await fetch(`/api/admin/users/${userData.id}/password`, {
                          method: "PUT",
                          headers: {
                            ...getAuthHeaders(),
                            "Content-Type": "application/json",
                          },
                          body: JSON.stringify({ currentPassword, newPassword }),
                        });

                        if (!res.ok) {
                          const error = await res.json();
                          throw new Error(error.error || "Failed to change password");
                        }

                        toast({ title: "Password changed successfully" });
                        const form = e.currentTarget;
                        if (form) setTimeout(() => form.reset(), 0);
                      } catch (error: any) {
                        toast({
                          title: "Failed to change password",
                          description: error.message,
                          variant: "destructive"
                        });
                      }
                    }}
                    className="space-y-4"
                  >
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <Input
                        id="currentPassword"
                        name="currentPassword"
                        type="password"
                        required
                        placeholder="Enter current password"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input
                        id="newPassword"
                        name="newPassword"
                        type="password"
                        required
                        placeholder="Enter new password"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmNewPassword">Confirm New Password</Label>
                      <Input
                        id="confirmNewPassword"
                        name="confirmNewPassword"
                        type="password"
                        required
                        placeholder="Confirm new password"
                      />
                    </div>
                    <Button type="submit" className="w-full gap-2">
                      <Key className="w-4 h-4" />
                      Change Password
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
