import React, { useState } from 'react';
import { Head, Link, useForm, router, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import HeaderTitle from '@/components/header-title';
import { type BreadcrumbItem } from '@/types';
import { formatPrice, parseCurrencyInput, formatCurrencyInput } from '@/utils/currency';
import { ArrowLeft, Save, Upload, X, Image as ImageIcon, Package, Tag as TagIcon } from 'lucide-react';

interface Brand {
  id: number;
  name: string;
}

interface Category {
  id: number;
  name: string;
}

interface ProductImage {
  id: number;
  product_id: number;
  image_path: string;
  is_cover: boolean;
  position: number;
  created_at: string;
  updated_at: string;
}

interface Product {
  id: number;
  name: string;
  slug: string;
  type: 'physical' | 'digital';
  description?: string;
  short_description?: string;
  sku?: string;
  price: number;
  compare_at_price?: number;
  cost_per_item?: number;
  track_quantity: boolean;
  quantity?: number;
  barcode?: string;
  status: 'draft' | 'published';
  is_featured: boolean;
  is_bestseller: boolean;
  is_new: boolean;
  is_for_sell: boolean;
  is_rent: boolean;
  show_price: boolean;
  published_at?: string;
  position?: number;
  brand_id?: number;
  category_id?: number;
  meta_title?: string;
  meta_description?: string;
  tags: string[];
  created_at: string;
  updated_at: string;
  images: ProductImage[];
}

interface Props {
  product: Product;
  brands: Brand[];
  categories: Category[];
}

export default function ProductEdit({ product, brands, categories }: Props) {
  const { props } = usePage();
  const flash = props.flash as { success?: string; error?: string } || { success: '', error: '' };
  
  React.useEffect(() => {
    if (flash.success) {
      console.log('Success:', flash.success);
      alert(flash.success);
    }
    if (flash.error) {
      console.log('Error:', flash.error);
      alert(flash.error);
    }
  }, [flash]);

  const [imagePreviews, setImagePreviews] = useState<Array<{ file: File; preview: string }>>([]);
  const [removeImages, setRemoveImages] = useState<number[]>([]);
  const [tags, setTags] = useState<string[]>(product.tags);
  const [tagInput, setTagInput] = useState('');
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);

  // State for formatted currency display
  const [formattedPrice, setFormattedPrice] = useState(
    product.price ? formatCurrencyInput(product.price.toString()) : ''
  );
  const [formattedComparePrice, setFormattedComparePrice] = useState(
    product.compare_at_price ? formatCurrencyInput(product.compare_at_price.toString()) : ''
  );

  // Calculate initial cover image index from active images (excluding removed ones)
  const getInitialCoverIndex = () => {
    const activeImages = product.images.filter(img => !removeImages.includes(img.id));
    const coverImage = activeImages.find(img => img.is_cover);
    return coverImage ? activeImages.indexOf(coverImage) : 0;
  };

  // Get the actual cover image ID for form submission
  const getInitialCoverImageId = () => {
    const coverImage = product.images.find(img => img.is_cover);
    return coverImage ? coverImage.id : null;
  };

  const [coverImageIndex, setCoverImageIndex] = useState<number>(getInitialCoverIndex());

  const { data, setData, post, processing, errors, reset } = useForm<{
    name: string;
    slug: string;
    type: 'physical' | 'digital';
    description: string;
    short_description: string;
    sku: string;
    price: string;
    compare_at_price: string;
    cost_per_item: string;
    track_quantity: boolean;
    quantity: string;
    barcode: string;
    status: 'draft' | 'published';
    is_featured: boolean;
    is_bestseller: boolean;
    is_new: boolean;
    is_for_sell: boolean;
    is_rent: boolean;
    show_price: boolean;
    position: number;
    brand_id: string | null;
    category_id: string | null;
    meta_title: string;
    meta_description: string;
    tags: string[];
    images: File[];
    cover_image: number | null;
    remove_images: number[];
  }>({
    name: product.name,
    slug: product.slug,
    type: product.type,
    description: product.description || '',
    short_description: product.short_description || '',
    sku: product.sku || '',
    price: product.price.toString(),
    compare_at_price: product.compare_at_price?.toString() || '',
    cost_per_item: product.cost_per_item?.toString() || '',
    track_quantity: product.track_quantity,
    quantity: product.quantity?.toString() || '',
    barcode: product.barcode || '',
    status: product.status,
    is_featured: product.is_featured,
    is_bestseller: product.is_bestseller,
    is_new: product.is_new,
    is_for_sell: product.is_for_sell,
    is_rent: product.is_rent,
    show_price: product.show_price,
    position: product.position || 0,
    brand_id: product.brand_id?.toString() || null,
    category_id: product.category_id?.toString() || null,
    meta_title: product.meta_title || '',
    meta_description: product.meta_description || '',
    tags: product.tags,
    images: [] as File[],
    cover_image: getInitialCoverImageId(),
    remove_images: [] as number[],
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setData(name as keyof typeof data, value);
    
    // Auto-generate slug from name only if slug hasn't been manually edited
    if (name === 'name' && !slugManuallyEdited) {
      const slugValue = value
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '') // Remove special characters except spaces and hyphens
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
        .trim(); // Remove leading/trailing spaces and hyphens
      setData('slug', slugValue);
    }
  };

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setData('slug', value);
    setSlugManuallyEdited(true); // Mark as manually edited when user types in slug field
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCurrencyInput(e.target.value);
    setFormattedPrice(formatted);
    const rawValue = parseCurrencyInput(formatted);
    setData('price', rawValue.toString());
  };

  const handleComparePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCurrencyInput(e.target.value);
    setFormattedComparePrice(formatted);
    const rawValue = parseCurrencyInput(formatted);
    setData('compare_at_price', rawValue.toString());
  };

  const handleCostChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatCurrencyInput(e.target.value);
    const rawValue = parseCurrencyInput(formattedValue);
    setData('cost_per_item', rawValue.toString());
    e.target.value = formattedValue;
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      const newPreviews = newFiles.map(file => ({
        file,
        preview: URL.createObjectURL(file)
      }));
      
      setData('images', [...data.images, ...newFiles]);
      setImagePreviews([...imagePreviews, ...newPreviews]);
    }
  };

  const handleRemoveNewImage = (index: number) => {
    const newImages = data.images.filter((_, i) => i !== index);
    const newPreviews = imagePreviews.filter((_, i) => i !== index);
    
    setData('images', newImages);
    setImagePreviews(newPreviews);
    
    // Adjust cover image index if needed
    if (coverImageIndex >= product.images.length + newImages.length) {
      setCoverImageIndex(Math.max(0, product.images.length + newImages.length - 1));
      setData('cover_image', Math.max(0, product.images.length + newImages.length - 1));
    }
  };

  const handleRemoveExistingImage = (imageId: number) => {
    const newRemoveImages = [...removeImages, imageId];
    setRemoveImages(newRemoveImages);
    setData('remove_images', newRemoveImages);
    
    // Adjust cover image if the removed image was the cover
    const removedImage = product.images.find(img => img.id === imageId);
    if (removedImage && removedImage.is_cover) {
      // Find a new cover image from remaining active images
      const newCoverImage = product.images.find((img) => 
        img.id !== imageId && !newRemoveImages.includes(img.id)
      );
      const newCoverImageId = newCoverImage ? newCoverImage.id : null;
      
      // Update UI index
      const newCoverIndex = newCoverImage ? 
        product.images.filter(img => !newRemoveImages.includes(img.id)).indexOf(newCoverImage) : 0;
      setCoverImageIndex(newCoverIndex);
      setData('cover_image', newCoverImageId);
    }
  };

  const handleSetCoverImage = (index: number) => {
    setCoverImageIndex(index);
    setData('cover_image', index);
  };

  const handleSetExistingCoverImage = (imageId: number) => {
    // Find the actual index in the filtered activeImages array
    const actualIndex = activeImages.findIndex(img => img.id === imageId);
    console.log('Setting cover image:', { imageId, actualIndex, totalActiveImages: activeImages.length });
    
    if (actualIndex !== -1) {
      setCoverImageIndex(actualIndex);
      setData('cover_image', imageId); // Send image ID, not index
      console.log('Cover image set to image ID:', imageId);
    } else {
      console.log('Image not found in active images:', imageId);
    }
  };

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      const newTags = [...tags, tagInput.trim()];
      setTags(newTags);
      setData('tags', newTags);
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    const newTags = tags.filter(tag => tag !== tagToRemove);
    setTags(newTags);
    setData('tags', newTags);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (key === 'images') {
        (value as File[]).forEach((file, index) => {
          formData.append(`images[${index}]`, file);
        });
      } else if (key === 'tags') {
        // Send tags as array elements instead of JSON string
        (value as string[]).forEach((tag, index) => {
          formData.append(`tags[${index}]`, tag);
        });
      } else if (key === 'price' || key === 'compare_at_price' || key === 'cost_per_item') {
        formData.append(key, value?.toString() || '');
      } else if (key === 'track_quantity' || key === 'is_featured' || key === 'is_bestseller' || key === 'is_new' || key === 'is_for_sell' || key === 'is_rent' || key === 'show_price') {
        formData.append(key, value ? '1' : '0');
      } else if (key === 'remove_images') {
        (value as number[]).forEach((id, index) => {
          formData.append(`remove_images[${index}]`, id.toString());
        });
      } else if (key === 'cover_image') {
        if (value !== null && value !== '') {
          formData.append(key, value.toString());
        }
      } else if (key !== 'images' && key !== 'tags') {
        formData.append(key, value?.toString() || '');
      }
    });

    formData.append('_method', 'PUT');

    router.post(`/cpanel/cms/product/${product.id}`, formData, {
      onSuccess: () => {
        setImagePreviews([]);
        setRemoveImages([]);
      },
    });
  };

  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: 'CMS',
      href: '/cpanel/cms',
    },
    {
      title: 'Produk',
      href: '/cpanel/cms/product',
    },
    {
      title: product.name,
      href: `/cpanel/cms/product/${product.id}`,
    },
    {
      title: 'Ubah',
      href: `/cpanel/cms/product/edit/${product.id}`,
    },
  ];

  const activeImages = product.images.filter(img => !removeImages.includes(img.id));
  const totalImages = activeImages.length + imagePreviews.length;

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title={`Ubah Produk: ${product.name}`} />
      
      <div className="space-y-6 p-6">
        <HeaderTitle
          title="Ubah Produk"
          description={`Ubah produk: ${product.name}`}
        />

        <Card>
          <CardHeader>
            <CardTitle>Form Produk</CardTitle>
            <CardDescription>
              Ubah informasi produk di bawah
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Nama Produk *</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={data.name}
                    onChange={handleInputChange}
                    placeholder="Masukkan nama produk"
                    required
                  />
                  {errors.name && <p className="text-sm text-red-600">{errors.name}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sku">SKU</Label>
                  <Input
                    id="sku"
                    name="sku"
                    type="text"
                    value={data.sku}
                    onChange={handleInputChange}
                    placeholder="SKU produk"
                  />
                  {errors.sku && <p className="text-sm text-red-600">{errors.sku}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="slug">Slug</Label>
                  <Input
                    id="slug"
                    name="slug"
                    type="text"
                    value={data.slug}
                    onChange={handleSlugChange}
                    placeholder="URL-friendly slug (opsional)"
                  />
                  {errors.slug && <p className="text-sm text-red-600">{errors.slug}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="type">Tipe Produk *</Label>
                  <Select value={data.type} onValueChange={(value) => setData('type', value as 'physical' | 'digital')}>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih tipe" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="physical">Fisik</SelectItem>
                      <SelectItem value="digital">Digital</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.type && <p className="text-sm text-red-600">{errors.type}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="brand_id">Merek</Label>
                  <Select value={data.brand_id || undefined} onValueChange={(value) => setData('brand_id', value || null)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih merek" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">Tidak ada merek</SelectItem>
                      {brands.map((brand) => (
                        <SelectItem key={brand.id} value={brand.id.toString()}>
                          {brand.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.brand_id && <p className="text-sm text-red-600">{errors.brand_id}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category_id">Kategori</Label>
                  <Select value={data.category_id || undefined} onValueChange={(value) => setData('category_id', value || null)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih kategori" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">Tidak ada kategori</SelectItem>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id.toString()}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.category_id && <p className="text-sm text-red-600">{errors.category_id}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="price">Harga *</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">Rp</span>
                    <Input
                      id="price"
                      name="price"
                      type="text"
                      value={formattedPrice}
                      onChange={handlePriceChange}
                      placeholder="0"
                      className="pl-10"
                      maxLength={15}
                      required
                    />
                  </div>
                  {errors.price && <p className="text-sm text-red-600">{errors.price}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="compare_at_price">Harga Banding</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">Rp</span>
                    <Input
                      id="compare_at_price"
                      name="compare_at_price"
                      type="text"
                      value={formattedComparePrice}
                      onChange={handleComparePriceChange}
                      placeholder="0"
                      className="pl-10"
                      maxLength={15}
                    />
                  </div>
                  {errors.compare_at_price && <p className="text-sm text-red-600">{errors.compare_at_price}</p>}
                </div>


                <div className="space-y-2">
                  <Label htmlFor="quantity">Stok</Label>
                  <Input
                    id="quantity"
                    name="quantity"
                    type="number"
                    min="0"
                    value={data.quantity}
                    onChange={handleInputChange}
                    placeholder="0"
                  />
                  {errors.quantity && <p className="text-sm text-red-600">{errors.quantity}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="position">Posisi</Label>
                  <Input
                    id="position"
                    name="position"
                    type="number"
                    min="0"
                    value={data.position}
                    onChange={handleInputChange}
                    placeholder="0"
                  />
                  {errors.position && <p className="text-sm text-red-600">{errors.position}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="short_description">Deskripsi Singkat</Label>
                <Input
                  id="short_description"
                  name="short_description"
                  type="text"
                  value={data.short_description}
                  onChange={handleInputChange}
                  placeholder="Deskripsi singkat produk"
                  maxLength={500}
                />
                {errors.short_description && <p className="text-sm text-red-600">{errors.short_description}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Deskripsi</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={data.description}
                  onChange={handleInputChange}
                  placeholder="Deskripsi lengkap produk"
                  rows={4}
                />
                {errors.description && <p className="text-sm text-red-600">{errors.description}</p>}
              </div>

              <div className="space-y-2">
                <Label>Tags</Label>
                <div className="flex items-center space-x-2 mb-2">
                  <Input
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    placeholder="Tambah tag..."
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addTag();
                      }
                    }}
                    className="flex-1"
                  />
                  <Button type="button" onClick={addTag}>
                    Tambah
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag, index) => (
                    <div key={index} className="inline-flex items-center space-x-1 bg-gray-100 text-gray-800 px-2 py-1 rounded-md text-sm">
                      <TagIcon className="h-3 w-3" />
                      <span>{tag}</span>
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="ml-1 text-xs text-red-500 hover:text-red-700"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
                {errors.tags && <p className="text-sm text-red-600">{errors.tags}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="images">Gambar Produk (Maks 5)</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                  <div className="space-y-4">
                    {totalImages === 0 ? (
                      <div className="text-center">
                        <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                        <div className="mt-2">
                          <label
                            htmlFor="images-hidden"
                            className="relative cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                          >
                            <span>Upload file</span>
                          </label>
                          <p className="text-sm text-gray-500">atau drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">PNG, JPG, GIF, SVG up to 2MB each</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        {/* Existing images */}
                        {activeImages.map((image, index) => (
                          <div key={image.id} className="relative group">
                            <img
                              src={`/storage/${image.image_path}`}
                              alt={`Image ${index + 1}`}
                              className="h-24 w-24 object-cover rounded-lg border-2 border-gray-200"
                            />
                            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button
                                type="button"
                                onClick={() => handleRemoveExistingImage(image.id)}
                                className="bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                              >
                                <X className="h-3 w-3" />
                              </button>
                            </div>
                            <div className="absolute bottom-2 left-2">
                              <button
                                type="button"
                                onClick={() => handleSetExistingCoverImage(image.id)}
                                className={`px-2 py-1 text-xs rounded ${
                                  coverImageIndex === index
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-gray-800 text-white hover:bg-gray-700'
                                }`}
                              >
                                {coverImageIndex === index ? 'Cover' : 'Set Cover'}
                              </button>
                            </div>
                          </div>
                        ))}
                        
                        {/* New images */}
                        {imagePreviews.map((image, index) => (
                          <div key={`new-${index}`} className="relative group">
                            <img
                              src={image.preview}
                              alt={`New ${index + 1}`}
                              className="h-24 w-24 object-cover rounded-lg border-2 border-blue-200"
                            />
                            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button
                                type="button"
                                onClick={() => handleRemoveNewImage(index)}
                                className="bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                              >
                                <X className="h-3 w-3" />
                              </button>
                            </div>
                            <div className="absolute bottom-2 left-2">
                              <button
                                type="button"
                                onClick={() => handleSetCoverImage(activeImages.length + index)}
                                className={`px-2 py-1 text-xs rounded ${
                                  coverImageIndex === activeImages.length + index
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-gray-800 text-white hover:bg-gray-700'
                                }`}
                              >
                                {coverImageIndex === activeImages.length + index ? 'Cover' : 'Set Cover'}
                              </button>
                            </div>
                          </div>
                        ))}
                        
                        {totalImages < 5 && (
                          <div className="col-span-full">
                            <label
                              htmlFor="images-hidden"
                              className="relative cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                            >
                              <span>Tambah Gambar</span>
                            </label>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                <input
                  id="images-hidden"
                  name="images"
                  type="file"
                  multiple
                  accept="image/*"
                  className="sr-only"
                  onChange={handleImageChange}
                />
                {errors.images && <p className="text-sm text-red-600">{errors.images}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="barcode">Barcode</Label>
                  <Input
                    id="barcode"
                    name="barcode"
                    type="text"
                    value={data.barcode}
                    onChange={handleInputChange}
                    placeholder="Barcode produk"
                  />
                  {errors.barcode && <p className="text-sm text-red-600">{errors.barcode}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Status *</Label>
                  <Select value={data.status} onValueChange={(value) => setData('status', value as 'draft' | 'published')}>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="published">Diterbitkan</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.status && <p className="text-sm text-red-600">{errors.status}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="is_featured"
                    checked={data.is_featured}
                    onCheckedChange={(checked) => setData('is_featured', Boolean(checked))}
                  />
                  <Label htmlFor="is_featured">Unggulan</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="is_bestseller"
                    checked={data.is_bestseller}
                    onCheckedChange={(checked) => setData('is_bestseller', Boolean(checked))}
                  />
                  <Label htmlFor="is_bestseller">Terlaris</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="is_new"
                    checked={data.is_new}
                    onCheckedChange={(checked) => setData('is_new', Boolean(checked))}
                  />
                  <Label htmlFor="is_new">Baru</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="is_for_sell"
                    checked={data.is_for_sell}
                    onCheckedChange={(checked) => setData('is_for_sell', Boolean(checked))}
                  />
                  <Label htmlFor="is_for_sell">Dijual</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="is_rent"
                    checked={data.is_rent}
                    onCheckedChange={(checked) => setData('is_rent', Boolean(checked))}
                  />
                  <Label htmlFor="is_rent">Disewakan</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="show_price"
                    checked={data.show_price}
                    onCheckedChange={(checked) => setData('show_price', Boolean(checked))}
                  />
                  <Label htmlFor="show_price">Tampilkan Harga</Label>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="meta_title">Meta Title</Label>
                  <Input
                    id="meta_title"
                    name="meta_title"
                    type="text"
                    value={data.meta_title}
                    onChange={handleInputChange}
                    placeholder="SEO meta title"
                  />
                  {errors.meta_title && <p className="text-sm text-red-600">{errors.meta_title}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="meta_description">Meta Description</Label>
                  <Textarea
                    id="meta_description"
                    name="meta_description"
                    value={data.meta_description}
                    onChange={handleInputChange}
                    placeholder="SEO meta description"
                    rows={3}
                  />
                  {errors.meta_description && <p className="text-sm text-red-600">{errors.meta_description}</p>}
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Link href={`/cpanel/cms/product`}>
                  <Button variant="outline">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Batal
                  </Button>
                </Link>
                <Button type="submit" disabled={processing}>
                  <Save className="mr-2 h-4 w-4" />
                  {processing ? 'Menyimpan...' : 'Simpan'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
