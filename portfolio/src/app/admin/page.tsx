"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Trash2, Edit, Loader2 } from "lucide-react";

type Message = { id: string; name: string; email: string; message: string; created_at: string; };
type Project = { id: string; title: string; description: string; tags: string[]; github: string; demo: string; col_span: string; };

export default function AdminDashboard() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Project>>({ title: '', description: '', tags: [], github: '', demo: '', col_span: 'md:col-span-1' });
  const [formLoading, setFormLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return;

    const [msgRes, projRes] = await Promise.all([
      supabase.from("messages").select("*").order("created_at", { ascending: false }),
      supabase.from("projects").select("*").order("created_at", { ascending: true })
    ]);

    if (!msgRes.error) setMessages(msgRes.data || []);
    if (!projRes.error) setProjects(projRes.data || []);
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    
    // Ensure tags are an array
    const tagsArray = typeof formData.tags === 'string' 
      ? (formData.tags as string).split(',').map(t => t.trim()) 
      : formData.tags || [];

    const projectPayload = { ...formData, tags: tagsArray };

    try {
      if (isEditing) {
        await supabase.from("projects").update(projectPayload).eq('id', isEditing);
      } else {
        await supabase.from("projects").insert([projectPayload]);
      }
      setIsEditing(null);
      setFormData({ title: '', description: '', tags: [], github: '', demo: '', col_span: 'md:col-span-1' });
      await fetchData();
    } catch (err) {
      console.error(err);
    }
    setFormLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    await supabase.from("projects").delete().eq('id', id);
    await fetchData();
  };

  const handleEdit = (p: Project) => {
    setIsEditing(p.id);
    setFormData({ ...p, tags: p.tags });
  };

  return (
    <div className="p-8 max-w-6xl mx-auto min-h-screen">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold">Admin Dashboard</h1>
      </div>

      <Tabs defaultValue="projects" className="w-full">
        <TabsList className="mb-8">
          <TabsTrigger value="projects">Manage Projects</TabsTrigger>
          <TabsTrigger value="messages">Inbox Messages</TabsTrigger>
        </TabsList>

        <TabsContent value="projects">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form Section */}
            <Card className="col-span-1 h-fit glass border-white/10">
              <CardHeader>
                <CardTitle>{isEditing ? 'Edit Project' : 'Add New Project'}</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSaveProject} className="space-y-4">
                  <div>
                    <Label>Title</Label>
                    <Input required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="bg-white/5 border-white/10" />
                  </div>
                  <div>
                    <Label>Description</Label>
                    <Textarea required rows={4} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="bg-white/5 border-white/10" />
                  </div>
                  <div>
                    <Label>Tags (comma separated)</Label>
                    <Input value={Array.isArray(formData.tags) ? formData.tags.join(', ') : formData.tags} onChange={e => setFormData({...formData, tags: e.target.value as any})} className="bg-white/5 border-white/10" />
                  </div>
                  <div>
                    <Label>GitHub URL</Label>
                    <Input value={formData.github || ''} onChange={e => setFormData({...formData, github: e.target.value})} className="bg-white/5 border-white/10" />
                  </div>
                  <div>
                    <Label>Live Demo URL</Label>
                    <Input value={formData.demo || ''} onChange={e => setFormData({...formData, demo: e.target.value})} className="bg-white/5 border-white/10" />
                  </div>
                  <div>
                    <Label>Grid Col Span (e.g. md:col-span-1 or md:col-span-2)</Label>
                    <Input value={formData.col_span} onChange={e => setFormData({...formData, col_span: e.target.value})} className="bg-white/5 border-white/10" />
                  </div>
                  
                  <div className="flex gap-2 pt-4">
                    <button type="submit" disabled={formLoading} className="flex-1 bg-primary text-primary-foreground py-2 rounded-md font-semibold hover:bg-primary/90 transition-colors flex justify-center items-center gap-2">
                      {formLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : isEditing ? 'Update' : 'Add Project'}
                    </button>
                    {isEditing && (
                      <button type="button" onClick={() => { setIsEditing(null); setFormData({ title: '', description: '', tags: [], github: '', demo: '', col_span: 'md:col-span-1' }); }} className="bg-white/10 text-white py-2 px-4 rounded-md font-semibold hover:bg-white/20 transition-colors">
                        Cancel
                      </button>
                    )}
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* List Section */}
            <div className="col-span-1 lg:col-span-2 space-y-4">
              {loading ? (
                <div className="text-muted-foreground p-8 text-center glass rounded-xl border border-white/10">Loading projects...</div>
              ) : projects.length === 0 ? (
                <div className="text-muted-foreground p-8 text-center glass rounded-xl border border-white/10">No projects found. Add your first one!</div>
              ) : (
                projects.map(p => (
                  <Card key={p.id} className="glass border-white/10 relative overflow-hidden group flex flex-col sm:flex-row gap-4 p-4 items-center">
                    <div className="flex-grow">
                      <h3 className="font-bold text-lg mb-1">{p.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{p.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {p.tags && p.tags.map((t, i) => <Badge key={i} variant="secondary" className="bg-white/10 border-none text-xs">{t}</Badge>)}
                      </div>
                    </div>
                    <div className="flex sm:flex-col gap-2 shrink-0">
                      <button onClick={() => handleEdit(p)} className="p-2 bg-primary/20 text-primary rounded-md hover:bg-primary/30 transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete(p.id)} className="p-2 bg-destructive/20 text-destructive rounded-md hover:bg-destructive/30 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </Card>
                ))
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="messages">
          {loading ? (
            <p className="text-muted-foreground">Loading messages...</p>
          ) : messages.length === 0 ? (
             <div className="text-muted-foreground p-8 text-center glass rounded-xl border border-white/10">No messages yet.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {messages.map((msg) => (
                <Card key={msg.id} className="flex flex-col glass border-white/10">
                  <CardHeader className="bg-white/5 border-b border-white/10 pb-4">
                    <CardTitle className="text-lg">{msg.name}</CardTitle>
                    <a href={`mailto:${msg.email}`} className="text-sm text-primary hover:underline">
                      {msg.email}
                    </a>
                  </CardHeader>
                  <CardContent className="pt-4 flex-grow">
                    <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                      {msg.message}
                    </p>
                    <p className="text-xs text-white/30 mt-4 pt-4 border-t border-white/10">
                      {new Date(msg.created_at).toLocaleString()}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
