"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Trash2, Edit, Loader2, User, Mail, MessageSquare, Send, Clock } from "lucide-react";

type Message = { id: string; name: string; email: string; message: string; created_at: string; };
type Project = { id: string; title: string; description: string; tags: string[]; github: string; demo: string; col_span: string; };

export default function AdminDashboard() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Project>>({ title: '', description: '', tags: [], github: '', demo: '', col_span: 'md:col-span-1' });
  const [formLoading, setFormLoading] = useState(false);

  // WhatsApp-style inbox state
  const [activeMessageId, setActiveMessageId] = useState<string | null>(null);
  const activeMessage = messages.find(m => m.id === activeMessageId);

  const fetchData = async () => {
    setLoading(true);
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
      setLoading(false);
      return;
    }

    const [msgRes, projRes] = await Promise.all([
      supabase.from("messages").select("*").order("created_at", { ascending: false }),
      supabase.from("projects").select("*").order("created_at", { ascending: true })
    ]);

    if (!msgRes.error) {
      setMessages(msgRes.data || []);
      if (msgRes.data && msgRes.data.length > 0 && !activeMessageId) {
        setActiveMessageId(msgRes.data[0].id);
      }
    }
    if (!projRes.error) setProjects(projRes.data || []);
    
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    
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

  const formatTime = (dateString: string) => {
    const d = new Date(dateString);
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  const formatDate = (dateString: string) => {
    const d = new Date(dateString);
    return d.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto min-h-screen">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl md:text-4xl font-black tracking-tight">Admin Dashboard</h1>
      </div>

      <Tabs defaultValue="messages" className="w-full">
        <TabsList className="mb-8">
          <TabsTrigger value="messages" className="flex items-center gap-2"><MessageSquare className="w-4 h-4" /> Inbox Messages</TabsTrigger>
          <TabsTrigger value="projects" className="flex items-center gap-2"><Plus className="w-4 h-4" /> Manage Projects</TabsTrigger>
        </TabsList>

        {/* ===================== MESSAGES TAB (WHATSAPP UI) ===================== */}
        <TabsContent value="messages" className="mt-0">
          <div className="glass rounded-2xl border border-white/10 overflow-hidden flex flex-col md:flex-row h-[700px] shadow-2xl">
            
            {/* Left Sidebar: Contact List */}
            <div className="w-full md:w-1/3 border-b md:border-b-0 md:border-r border-white/10 flex flex-col bg-black/40">
              <div className="p-4 border-b border-white/10 bg-white/5 backdrop-blur-md">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <Mail className="w-5 h-5 text-primary" /> Inbox
                  <Badge variant="secondary" className="ml-auto bg-primary/20 text-primary hover:bg-primary/30 border-none">
                    {messages.length}
                  </Badge>
                </h2>
              </div>
              
              <div className="overflow-y-auto flex-grow custom-scrollbar">
                {loading ? (
                  <div className="p-8 text-center text-muted-foreground flex items-center justify-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" /> Loading...
                  </div>
                ) : messages.length === 0 ? (
                  <div className="p-8 text-center text-muted-foreground">No messages yet.</div>
                ) : (
                  messages.map((msg) => (
                    <div 
                      key={msg.id}
                      onClick={() => setActiveMessageId(msg.id)}
                      className={`p-4 border-b border-white/5 cursor-pointer transition-all duration-200 hover:bg-white/5 ${
                        activeMessageId === msg.id ? 'bg-primary/10 border-l-4 border-l-primary' : 'border-l-4 border-l-transparent'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-semibold text-white truncate pr-2 flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white font-bold text-xs shrink-0">
                            {msg.name.charAt(0).toUpperCase()}
                          </div>
                          <span className="truncate">{msg.name}</span>
                        </h3>
                        <span className="text-xs text-white/40 whitespace-nowrap pt-1 flex items-center gap-1 shrink-0">
                          {formatDate(msg.created_at)}
                        </span>
                      </div>
                      <p className="text-sm text-white/50 line-clamp-2 pl-10">
                        {msg.message}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Right Pane: Chat View */}
            <div className="w-full md:w-2/3 flex flex-col bg-[#0a0a0a] relative">
              {activeMessage ? (
                <>
                  {/* Chat Header */}
                  <div className="p-4 border-b border-white/10 bg-white/5 backdrop-blur-md flex items-center justify-between sticky top-0 z-10">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-[0_0_15px_rgba(56,189,248,0.4)]">
                        {activeMessage.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">{activeMessage.name}</h3>
                        <a href={`mailto:${activeMessage.email}`} className="text-xs text-primary hover:underline flex items-center gap-1">
                          <Mail className="w-3 h-3" /> {activeMessage.email}
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Chat History */}
                  <div className="flex-grow p-6 overflow-y-auto custom-scrollbar relative">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at center, white 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
                    
                    <div className="flex justify-center mb-6">
                      <Badge variant="outline" className="bg-white/5 border-white/10 text-white/40">
                        {formatDate(activeMessage.created_at)}
                      </Badge>
                    </div>

                    <div className="flex flex-col gap-2 max-w-[85%] relative z-10">
                      <span className="text-xs text-white/40 ml-2">{activeMessage.name}</span>
                      <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl rounded-tl-sm p-4 text-white/90 shadow-lg relative group">
                        <p className="whitespace-pre-wrap leading-relaxed text-sm md:text-base">
                          {activeMessage.message}
                        </p>
                        <div className="mt-3 flex justify-end items-center gap-1 text-[10px] text-white/40">
                          <Clock className="w-3 h-3" />
                          {formatTime(activeMessage.created_at)}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Chat Input / Reply Box */}
                  <div className="p-4 bg-white/5 border-t border-white/10 backdrop-blur-md">
                    <div className="flex items-center gap-2 max-w-3xl mx-auto">
                      <div className="flex-grow relative">
                        <Input 
                          readOnly 
                          value="Reply via Email..." 
                          className="bg-black/50 border-white/10 text-white/50 h-12 rounded-full px-6 cursor-default"
                        />
                      </div>
                      <a 
                        href={`mailto:${activeMessage.email}?subject=Reply from Portfolio`}
                        className="h-12 w-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground hover:bg-primary/90 hover:scale-105 transition-all shadow-[0_0_15px_rgba(56,189,248,0.5)] flex-shrink-0"
                        title="Reply via Email"
                      >
                        <Send className="w-5 h-5 -ml-1 mt-1" />
                      </a>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-grow flex flex-col items-center justify-center text-white/30 p-8">
                  <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center mb-6">
                    <MessageSquare className="w-10 h-10" />
                  </div>
                  <h3 className="text-xl font-semibold text-white/50 mb-2">No Message Selected</h3>
                  <p className="text-center text-sm max-w-sm">Select a contact from the left sidebar to view their message.</p>
                </div>
              )}
            </div>
            
          </div>
        </TabsContent>

        {/* ===================== PROJECTS TAB (CRUD) ===================== */}
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
                  <Card key={p.id} className="glass border-white/10 relative overflow-hidden group flex flex-col sm:flex-row gap-4 p-4 items-center transition-all hover:border-primary/50">
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
      </Tabs>
    </div>
  );
}
