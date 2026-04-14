import { useState } from "react";
import { 
  Sparkles, 
  Video, 
  Zap, 
  Lightbulb, 
  Send, 
  Copy, 
  Check, 
  RefreshCw,
  LayoutDashboard,
  Smartphone,
  Instagram,
  Youtube,
  MessageSquare,
  Plane,
  PenTool,
  Rocket
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { generateUGCContent, UGCRequest } from "@/src/services/geminiService";
import { cn } from "@/lib/utils";

export default function App() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState<UGCRequest>({
    contentNiche: "",
    contentTopic: "",
    targetAudience: "",
    platform: "tiktok",
    tone: "energetic",
    contentType: "script"
  });

  const handleInputChange = (field: keyof UGCRequest, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleGenerate = async () => {
    if (!formData.contentNiche || !formData.contentTopic) return;
    
    setLoading(true);
    try {
      const content = await generateUGCContent(formData);
      setResult(content || "Tidak ada konten yang dihasilkan.");
    } catch (error) {
      console.error(error);
      setResult("Terjadi kesalahan saat membuat konten. Silakan periksa kunci API Anda dan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (result) {
      navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFDF9] text-[#002B5B] font-sans selection:bg-primary/20">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/60 backdrop-blur-md">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="bg-[#FF6B00] p-2.5 rounded-2xl shadow-lg rotate-3">
                <Rocket className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -top-2 -right-2">
                <Plane className="w-5 h-5 text-[#008B8B] animate-bounce" />
              </div>
            </div>
            <div className="flex flex-col">
              <h1 className="text-2xl font-heading font-bold tracking-tight leading-none flex items-center gap-1">
                <span className="text-[#FF6B00]">365</span>
                <span className="text-[#008B8B]">Content</span>
              </h1>
              <p className="text-[10px] font-heading uppercase tracking-[0.2em] text-[#FF4081] font-bold">
                Journey Generator
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="px-3 py-1 border-[#008B8B] text-[#008B8B] font-heading">
              Foundation of Journey
            </Badge>
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-[#008B8B]/10">
              <LayoutDashboard className="w-5 h-5 text-[#008B8B]" />
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Input Section */}
          <div className="lg:col-span-5 space-y-6">
            <Card className="border-2 border-[#008B8B]/20 shadow-xl shadow-[#008B8B]/5 bg-white overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-[#FF6B00] via-[#008B8B] to-[#FF4081]" />
              <CardHeader>
                <CardTitle className="text-xl font-heading flex items-center gap-2 text-[#002B5B]">
                  <PenTool className="w-5 h-5 text-[#FF6B00]" />
                  Detail Perjalanan
                </CardTitle>
                <CardDescription className="font-medium text-[#008B8B]/70">
                  Mulai petualangan konten Anda hari ini.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="contentNiche" className="font-heading text-[#002B5B]">Niche Konten</Label>
                  <Input 
                    id="contentNiche" 
                    placeholder="misal: Skincare, Gadget, Parenting" 
                    value={formData.contentNiche}
                    onChange={(e) => handleInputChange("contentNiche", e.target.value)}
                    className="border-2 focus-visible:ring-[#FF6B00] rounded-xl h-11"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="contentTopic" className="font-heading text-[#002B5B]">Topik Konten</Label>
                  <Textarea 
                    id="contentTopic" 
                    placeholder="Apa yang ingin Anda bahas? Manfaat atau masalah tertentu?" 
                    className="min-h-[120px] border-2 focus-visible:ring-[#FF6B00] rounded-xl"
                    value={formData.contentTopic}
                    onChange={(e) => handleInputChange("contentTopic", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="audience" className="font-heading text-[#002B5B]">Target Audiens</Label>
                  <Input 
                    id="audience" 
                    placeholder="misal: Penggemar skincare Gen Z" 
                    value={formData.targetAudience}
                    onChange={(e) => handleInputChange("targetAudience", e.target.value)}
                    className="border-2 focus-visible:ring-[#FF6B00] rounded-xl h-11"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="font-heading text-[#002B5B]">Platform</Label>
                    <Select 
                      value={formData.platform} 
                      onValueChange={(v) => handleInputChange("platform", v as any)}
                    >
                      <SelectTrigger className="border-2 rounded-xl h-11">
                        <SelectValue placeholder="Pilih platform" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tiktok">
                          <div className="flex items-center gap-2">
                            <Smartphone className="w-4 h-4" /> TikTok
                          </div>
                        </SelectItem>
                        <SelectItem value="instagram">
                          <div className="flex items-center gap-2">
                            <Instagram className="w-4 h-4" /> Instagram
                          </div>
                        </SelectItem>
                        <SelectItem value="youtube">
                          <div className="flex items-center gap-2">
                            <Youtube className="w-4 h-4" /> YouTube
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="font-heading text-[#002B5B]">Nada Bicara</Label>
                    <Select 
                      value={formData.tone} 
                      onValueChange={(v) => handleInputChange("tone", v as any)}
                    >
                      <SelectTrigger className="border-2 rounded-xl h-11">
                        <SelectValue placeholder="Pilih nada" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="energetic">Energik</SelectItem>
                        <SelectItem value="casual">Santai</SelectItem>
                        <SelectItem value="professional">Profesional</SelectItem>
                        <SelectItem value="humorous">Humoris</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Separator className="my-2" />

                <div className="space-y-3">
                  <Label className="font-heading text-[#002B5B]">Jenis Konten</Label>
                  <Tabs 
                    defaultValue="script" 
                    className="w-full"
                    onValueChange={(v) => handleInputChange("contentType", v as any)}
                  >
                    <TabsList className="grid w-full grid-cols-3 bg-[#FFFDF9] border-2 rounded-xl p-1 h-12">
                      <TabsTrigger value="script" className="flex items-center gap-2 rounded-lg data-[state=active]:bg-[#FF6B00] data-[state=active]:text-white">
                        <Video className="w-4 h-4" /> Skrip
                      </TabsTrigger>
                      <TabsTrigger value="hooks" className="flex items-center gap-2 rounded-lg data-[state=active]:bg-[#008B8B] data-[state=active]:text-white">
                        <Zap className="w-4 h-4" /> Hook
                      </TabsTrigger>
                      <TabsTrigger value="ideas" className="flex items-center gap-2 rounded-lg data-[state=active]:bg-[#FF4081] data-[state=active]:text-white">
                        <Lightbulb className="w-4 h-4" /> Ide
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>

                <Button 
                  className="w-full mt-4 h-14 text-lg font-heading font-bold shadow-xl shadow-[#FF6B00]/20 transition-all hover:scale-[1.02] bg-[#FF6B00] hover:bg-[#E65F00] rounded-2xl" 
                  onClick={handleGenerate}
                  disabled={loading || !formData.contentNiche || !formData.contentTopic}
                >
                  {loading ? (
                    <>
                      <RefreshCw className="mr-2 h-6 w-6 animate-spin" />
                      Menjelajah...
                    </>
                  ) : (
                    <>
                      <Plane className="mr-2 h-6 w-6 -rotate-45" />
                      Terbangkan Konten!
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Output Section */}
          <div className="lg:col-span-7">
            <Card className="border-2 border-[#FF4081]/20 shadow-xl shadow-[#FF4081]/5 bg-white h-full flex flex-col min-h-[600px] rounded-3xl overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-6 border-b-2 border-dashed border-[#FF4081]/10">
                <div>
                  <CardTitle className="text-xl font-heading flex items-center gap-2 text-[#002B5B]">
                    <MessageSquare className="w-6 h-6 text-[#FF4081]" />
                    Hasil Petualangan
                  </CardTitle>
                  <CardDescription className="font-medium text-[#FF4081]/70">
                    Inspirasi konten Anda siap digunakan.
                  </CardDescription>
                </div>
                {result && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={copyToClipboard}
                    className="flex items-center gap-2 border-2 border-[#FF4081] text-[#FF4081] hover:bg-[#FF4081] hover:text-white rounded-xl transition-colors"
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    {copied ? "Tersalin!" : "Salin Ide"}
                  </Button>
                )}
              </CardHeader>
              <CardContent className="flex-1 p-0 bg-[#FFFDF9]/50">
                <ScrollArea className="h-[calc(100vh-320px)] px-8 py-8">
                  {result ? (
                    <div className="prose prose-slate max-w-none prose-headings:font-heading prose-headings:text-[#002B5B] prose-p:text-[#002B5B]/80 prose-li:text-[#002B5B]/80 prose-strong:text-[#FF6B00]">
                      <ReactMarkdown>{result}</ReactMarkdown>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full text-center space-y-6 opacity-60 py-20">
                      <div className="relative">
                        <div className="bg-[#FF4081]/10 p-10 rounded-full animate-pulse">
                          <Plane className="w-16 h-16 text-[#FF4081] -rotate-45" />
                        </div>
                        <div className="absolute -top-4 -right-4 bg-[#FF6B00] p-3 rounded-full shadow-lg">
                          <Sparkles className="w-6 h-6 text-white" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <p className="font-heading font-bold text-2xl text-[#002B5B]">Siap untuk Lepas Landas?</p>
                        <p className="text-sm max-w-[300px] text-[#002B5B]/60 font-medium">Isi detail perjalanan di sebelah kiri untuk mulai menghasilkan konten kreatif Anda.</p>
                      </div>
                    </div>
                  )}
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-white/40 py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Plane className="w-4 h-4 text-[#008B8B]" />
            <p className="font-heading font-bold text-[#002B5B]">365 Content Journey</p>
          </div>
          <p className="text-xs text-[#002B5B]/40 font-medium uppercase tracking-widest">
            foundation of journey • ditenagai oleh gemini ai
          </p>
        </div>
      </footer>
    </div>
  );
}
