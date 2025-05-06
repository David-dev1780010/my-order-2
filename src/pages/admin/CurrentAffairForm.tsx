
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';
import { CurrentAffair } from '@/types';
import MainLayout from '@/layouts/MainLayout';
import PageHeader from '@/components/common/PageHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { toast } from '@/hooks/use-toast';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Switch } from '@/components/ui/switch';

// Define the form validation schema
const formSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long"),
  content: z.string().min(10, "Content must be at least 10 characters long"),
  category: z.string().min(2, "Category is required"),
  tags: z.string(),
  imageUrl: z.string().optional(),
  isPremium: z.boolean().default(false),
});

type FormData = z.infer<typeof formSchema>;

const CurrentAffairForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const isEditing = !!id;
  const navigate = useNavigate();
  const { currentAffairs, createCurrentAffair, updateCurrentAffair } = useApp();

  // Find existing current affair if editing
  const existingAffair = isEditing 
    ? currentAffairs.find(affair => affair.id === id)
    : undefined;

  // For demo purposes, we'll consider every other affair as premium
  const isPremiumByDefault = existingAffair ? 
    currentAffairs.findIndex(affair => affair.id === id) % 2 === 0 : false;

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: existingAffair?.title || '',
      content: existingAffair?.content || '',
      category: existingAffair?.category || '',
      tags: existingAffair?.tags.join(', ') || '',
      imageUrl: existingAffair?.imageUrl || '',
      isPremium: isPremiumByDefault,
    },
  });

  useEffect(() => {
    // If we're editing but the affair doesn't exist, redirect to the list
    if (isEditing && !existingAffair) {
      toast({
        title: "Current affair not found",
        description: "The current affair you are trying to edit does not exist.",
        variant: "destructive",
      });
      navigate("/admin/current-affairs");
    }
  }, [isEditing, existingAffair, navigate]);

  const onSubmit = (data: FormData) => {
    try {
      // Process the tags (convert from comma-separated to array)
      const tagsArray = data.tags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag !== '');

      if (isEditing && existingAffair) {
        updateCurrentAffair({
          ...existingAffair,
          title: data.title,
          content: data.content,
          category: data.category,
          tags: tagsArray,
          imageUrl: data.imageUrl,
        });
        
        toast({
          title: "Current affair updated",
          description: "The current affair has been updated successfully."
        });
      } else {
        createCurrentAffair({
          title: data.title,
          content: data.content,
          category: data.category,
          tags: tagsArray,
          imageUrl: data.imageUrl,
        });
        
        toast({
          title: "Current affair created",
          description: "The current affair has been created successfully."
        });
      }
      
      // Redirect back to the list
      navigate("/admin/current-affairs");
    } catch (error) {
      console.error("Error saving current affair:", error);
      toast({
        title: "Error",
        description: "There was a problem saving the current affair.",
        variant: "destructive",
      });
    }
  };

  return (
    <MainLayout>
      <PageHeader
        title={isEditing ? "Edit Current Affair" : "Add New Current Affair"}
        description={isEditing ? "Update an existing current affair" : "Create a new current affair for students"}
      />

      <Card>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-4 pt-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter current affair title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Politics, Economy, Science" {...field} />
                    </FormControl>
                    <FormDescription>
                      The main category this current affair belongs to
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Content</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Enter the content of the current affair..." 
                        className="min-h-[200px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tags</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter tags separated by commas" {...field} />
                    </FormControl>
                    <FormDescription>
                      Add relevant tags separated by commas (e.g. "election, democracy, voting")
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="imageUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image URL (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="https://example.com/image.jpg" {...field} />
                    </FormControl>
                    <FormDescription>
                      URL to an image that represents this current affair
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="isPremium"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Premium Content</FormLabel>
                      <FormDescription>
                        Mark this current affair as premium content
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </CardContent>

            <CardFooter className="flex justify-between">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => navigate("/admin/current-affairs")}
              >
                Cancel
              </Button>
              <Button type="submit">
                {isEditing ? "Update Current Affair" : "Create Current Affair"}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </MainLayout>
  );
};

export default CurrentAffairForm;
