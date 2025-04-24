import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate, Navigate } from "react-router-dom";
import { ArrowLeft, Save, Trash, Upload, AlertCircle } from "lucide-react";
import { useForm, useFieldArray } from "react-hook-form";
import Layout from "./Layout";

// Mock data (replace with API call in production)
const trekkingSpots = JSON.parse(localStorage.getItem("trekkingSpots")) || [
  {
    id: 1,
    name: "Annapurna Circuit",
    image: "/images/annapurna.jpg",
    galleryImages: ["/images/annapurna-2.jpg", "/images/annapurna-3.jpg"],
    difficulty: "Moderate to Challenging",
    description: "Experience the diverse landscapes of the Annapurna region.",
    longDescription:
      "The Annapurna Circuit is one of the most popular treks in Nepal, offering stunning views of the Annapurna range.",
    highlights: ["Thorong La Pass", "Poon Hill", "Hot Springs at Tatopani"],
    duration: "12-18 days",
    distance: "160-230 km",
    maxElevation: "5,416m (Thorong La Pass)",
    bestSeason: "October-November, March-April",
    accommodation: "Teahouses/Lodges",
    startPoint: "Besisahar",
    endPoint: "Nayapul",
    price: 1200,
    rating: 4.8,
    reviews: 124,
    itinerary: [
      {
        day: 1,
        title: "Arrival in Kathmandu",
        description: "Arrive in Kathmandu and transfer to your hotel.",
      },
      {
        day: 2,
        title: "Drive to Besisahar (760m)",
        description: "Drive from Kathmandu to Besisahar.",
      },
    ],
    included: ["Airport pickups and drops", "All ground transportation"],
    notIncluded: ["International airfare", "Nepal visa fee"],
    faqs: [
      {
        question: "How difficult is the Annapurna Circuit Trek?",
        answer: "Moderate to challenging, requires good fitness.",
      },
    ],
    testimonials: [
      {
        name: "Sarah Johnson",
        country: "USA",
        comment: "Adventure of a lifetime!",
        rating: 5,
      },
    ],
  },
];

// Utility function to fetch trek data
const getTrekkingData = (id) => {
  return trekkingSpots.find((spot) => spot.id === Number(id)) || null;
};

// Simulate API delay
const simulateApiCall = (data) =>
  new Promise((resolve) => setTimeout(() => resolve(data), 1000));

export default function DetailsAdminPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;
  const [isLoading, setIsLoading] = useState(isEditMode);
  const [imagePreviews, setImagePreviews] = useState({ main: "", gallery: [] });
  const [isAuthenticated] = useState(true); // Replace with actual auth check
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    defaultValues: {
      name: "",
      image: null,
      galleryImages: [],
      difficulty: "",
      description: "",
      longDescription: "",
      highlights: "",
      duration: "",
      distance: "",
      maxElevation: "",
      bestSeason: "",
      accommodation: "",
      startPoint: "",
      endPoint: "",
      price: "",
      rating: "",
      reviews: "",
      itinerary: [{ day: "", title: "", description: "" }],
      included: "",
      notIncluded: "",
      faqs: [{ question: "", answer: "" }],
      testimonials: [{ name: "", country: "", comment: "", rating: "" }],
    },
  });

  const {
    fields: itineraryFields,
    append: appendItinerary,
    remove: removeItinerary,
  } = useFieldArray({ control, name: "itinerary" });
  const {
    fields: faqFields,
    append: appendFaq,
    remove: removeFaq,
  } = useFieldArray({ control, name: "faqs" });
  const {
    fields: testimonialFields,
    append: appendTestimonial,
    remove: removeTestimonial,
  } = useFieldArray({ control, name: "testimonials" });

  useEffect(() => {
    if (isEditMode) {
      const fetchTrek = async () => {
        const trek = await simulateApiCall(getTrekkingData(id));
        if (trek) {
          reset({
            name: trek.name,
            image: null,
            galleryImages: [],
            difficulty: trek.difficulty,
            description: trek.description,
            longDescription: trek.longDescription,
            highlights: trek.highlights.join(", "),
            duration: trek.duration,
            distance: trek.distance,
            maxElevation: trek.maxElevation,
            bestSeason: trek.bestSeason,
            accommodation: trek.accommodation,
            startPoint: trek.startPoint,
            endPoint: trek.endPoint,
            price: trek.price.toString(),
            rating: trek.rating.toString(),
            reviews: trek.reviews.toString(),
            itinerary: trek.itinerary,
            included: trek.included.join(", "),
            notIncluded: trek.notIncluded.join(", "),
            faqs: trek.faqs,
            testimonials: trek.testimonials,
          });
          setImagePreviews({ main: trek.image, gallery: trek.galleryImages });
        }
        setIsLoading(false);
      };
      fetchTrek();
    }
  }, [id, isEditMode, reset]);

  const handleImageUpload = (e, type) => {
    const files = e.target.files;
    if (type === "main" && files[0]) {
      const url = URL.createObjectURL(files[0]);
      setImagePreviews((prev) => ({ ...prev, main: url }));
      setValue("image", files[0]);
    } else if (type === "gallery") {
      const newImages = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setImagePreviews((prev) => ({
        ...prev,
        gallery: [...prev.gallery, ...newImages],
      }));
      setValue(
        "galleryImages",
        [...imagePreviews.gallery, ...newImages].map((_, i) => ({
          file: files[i] || null,
        }))
      );
    }
  };

  const removeGalleryImage = (index) => {
    setImagePreviews((prev) => ({
      ...prev,
      gallery: prev.gallery.filter((_, i) => i !== index),
    }));
    setValue(
      "galleryImages",
      imagePreviews.gallery
        .filter((_, i) => i !== index)
        .map((_, i) => ({ file: null }))
    );
  };

  const onSubmit = async (data) => {
    const trekData = {
      id: isEditMode ? Number(id) : Date.now(),
      name: data.name,
      image: imagePreviews.main || "/placeholder.jpg",
      galleryImages:
        imagePreviews.gallery.length > 0
          ? imagePreviews.gallery
          : ["/placeholder.jpg"],
      difficulty: data.difficulty,
      description: data.description,
      longDescription: data.longDescription,
      highlights: data.highlights
        .split(",")
        .map((h) => h.trim())
        .filter(Boolean),
      duration: data.duration,
      distance: data.distance,
      maxElevation: data.maxElevation,
      bestSeason: data.bestSeason,
      accommodation: data.accommodation,
      startPoint: data.startPoint,
      endPoint: data.endPoint,
      price: Number(data.price),
      rating: Number(data.rating) || 0,
      reviews: Number(data.reviews) || 0,
      itinerary: data.itinerary.filter(
        (item) => item.day && item.title && item.description
      ),
      included: data.included
        .split(",")
        .map((i) => i.trim())
        .filter(Boolean),
      notIncluded: data.notIncluded
        .split(",")
        .map((i) => i.trim())
        .filter(Boolean),
      faqs: data.faqs.filter((faq) => faq.question && faq.answer),
      testimonials: data.testimonials.filter(
        (t) => t.name && t.comment && t.rating
      ),
    };

    // Simulate API call
    await simulateApiCall(trekData);

    // Update mock data and persist to localStorage
    if (isEditMode) {
      const index = trekkingSpots.findIndex((spot) => spot.id === Number(id));
      if (index !== -1) trekkingSpots[index] = trekData;
    } else {
      trekkingSpots.push(trekData);
    }
    localStorage.setItem("trekkingSpots", JSON.stringify(trekkingSpots));

    alert(
      isEditMode ? "Trek updated successfully!" : "Trek added successfully!"
    );
    navigate("/admin/trekking");
  };

  const handleCancel = () => {
    setShowCancelConfirm(true);
  };

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-sky-50 to-sky-100 p-4">
        <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-md p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <Link
                to="/admin/trekking"
                className="flex items-center gap-2 text-sky-600 hover:underline"
              >
                <ArrowLeft className="h-5 w-5" />
                <span>Back to Trek List</span>
              </Link>
              <h1 className="text-3xl font-bold text-sky-800">
                {isEditMode ? "Edit Trek" : "Add New Trek"}
              </h1>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Basic Information */}
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-sky-800">
                Basic Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Trek Name <span className="text-red-500">*</span>
                    <span
                      className="ml-2 text-gray-500 cursor-help"
                      title="Enter the full name of the trek"
                    >
                      <AlertCircle className="h-4 w-4 inline" />
                    </span>
                  </label>
                  <input
                    id="name"
                    {...register("name", { required: "Trek name is required" })}
                    className={`w-full p-3 border rounded-md ${
                      errors.name ? "border-red-500" : "border-gray-300"
                    } focus:ring-emerald-500 focus:border-emerald-500`}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.name.message}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="price"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Price ($) <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="price"
                    type="number"
                    {...register("price", {
                      required: "Price is required",
                      min: { value: 0, message: "Price must be positive" },
                    })}
                    className={`w-full p-3 border rounded-md ${
                      errors.price ? "border-red-500" : "border-gray-300"
                    } focus:ring-emerald-500 focus:border-emerald-500`}
                  />
                  {errors.price && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.price.message}
                    </p>
                  )}
                </div>
              </div>
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Short Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="description"
                  {...register("description", {
                    required: "Short description is required",
                  })}
                  className={`w-full p-3 border rounded-md ${
                    errors.description ? "border-red-500" : "border-gray-300"
                  } focus:ring-emerald-500 focus:border-emerald-500`}
                  rows="4"
                />
                {errors.description && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.description.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="longDescription"
                  className="block text-sm font-medium text-gray-700"
                >
                  Detailed Description
                </label>
                <textarea
                  id="longDescription"
                  {...register("longDescription")}
                  className="w-full p-3 border rounded-md border-gray-300 focus:ring-emerald-500 focus:border-emerald-500"
                  rows="6"
                />
              </div>
            </div>

            {/* Images */}
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-sky-800">Images</h2>
              <div>
                <label
                  htmlFor="image"
                  className="block text-sm font-medium text-gray-700"
                >
                  Main Image
                </label>
                <div className="flex items-center gap-4">
                  <input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, "main")}
                    className="w-full p-3 border rounded-md"
                  />
                  {imagePreviews.main && (
                    <img
                      src={imagePreviews.main}
                      alt="Main Preview"
                      className="h-20 w-20 object-cover rounded-md"
                    />
                  )}
                </div>
              </div>
              <div>
                <label
                  htmlFor="galleryImages"
                  className="block text-sm font-medium text-gray-700"
                >
                  Gallery Images
                </label>
                <input
                  id="galleryImages"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => handleImageUpload(e, "gallery")}
                  className="w-full p-3 border rounded-md"
                />
                <div className="grid grid-cols-4 gap-4 mt-4">
                  {imagePreviews.gallery.map((img, index) => (
                    <div key={index} className="relative">
                      <img
                        src={img}
                        alt={`Gallery Preview ${index}`}
                        className="h-20 w-20 object-cover rounded-md"
                      />
                      <button
                        type="button"
                        onClick={() => removeGalleryImage(index)}
                        className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                      >
                        <Trash className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Trek Details */}
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-sky-800">
                Trek Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { id: "difficulty", label: "Difficulty" },
                  { id: "duration", label: "Duration" },
                  { id: "distance", label: "Distance" },
                  { id: "maxElevation", label: "Max Elevation" },
                  { id: "bestSeason", label: "Best Season" },
                  { id: "accommodation", label: "Accommodation" },
                  { id: "startPoint", label: "Start Point" },
                  { id: "endPoint", label: "End Point" },
                ].map(({ id, label }) => (
                  <div key={id}>
                    <label
                      htmlFor={id}
                      className="block text-sm font-medium text-gray-700"
                    >
                      {label}
                    </label>
                    <input
                      id={id}
                      {...register(id)}
                      className="w-full p-3 border rounded-md border-gray-300 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>
                ))}
              </div>
              <div>
                <label
                  htmlFor="highlights"
                  className="block text-sm font-medium text-gray-700"
                >
                  Highlights (comma-separated)
                </label>
                <input
                  id="highlights"
                  {...register("highlights")}
                  className="w-full p-3 border rounded-md border-gray-300 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
            </div>

            {/* Itinerary */}
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-sky-800">Itinerary</h2>
              {itineraryFields.map((item, index) => (
                <div key={item.id} className="border p-4 rounded-md relative">
                  <button
                    type="button"
                    onClick={() => removeItinerary(index)}
                    className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                  >
                    <Trash className="h-4 w-4" />
                  </button>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Day
                      </label>
                      <input
                        {...register(`itinerary.${index}.day`, {
                          required: "Day is required",
                        })}
                        className={`w-full p-3 border rounded-md ${
                          errors.itinerary?.[index]?.day
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                      />
                      {errors.itinerary?.[index]?.day && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.itinerary[index].day.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Title
                      </label>
                      <input
                        {...register(`itinerary.${index}.title`, {
                          required: "Title is required",
                        })}
                        className={`w-full p-3 border rounded-md ${
                          errors.itinerary?.[index]?.title
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                      />
                      {errors.itinerary?.[index]?.title && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.itinerary[index].title.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Description
                      </label>
                      <input
                        {...register(`itinerary.${index}.description`, {
                          required: "Description is required",
                        })}
                        className={`w-full p-3 border rounded-md ${
                          errors.itinerary?.[index]?.description
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                      />
                      {errors.itinerary?.[index]?.description && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.itinerary[index].description.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={() =>
                  appendItinerary({ day: "", title: "", description: "" })
                }
                className="text-sky-600 hover:underline"
              >
                + Add Itinerary Item
              </button>
            </div>

            {/* Inclusions */}
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-sky-800">
                Inclusions
              </h2>
              <div>
                <label
                  htmlFor="included"
                  className="block text-sm font-medium text-gray-700"
                >
                  Included (comma-separated)
                </label>
                <textarea
                  id="included"
                  {...register("included")}
                  className="w-full p-3 border rounded-md border-gray-300 focus:ring-emerald-500 focus:border-emerald-500"
                  rows="4"
                />
              </div>
              <div>
                <label
                  htmlFor="notIncluded"
                  className="block text-sm font-medium text-gray-700"
                >
                  Not Included (comma-separated)
                </label>
                <textarea
                  id="notIncluded"
                  {...register("notIncluded")}
                  className="w-full p-3 border rounded-md border-gray-300 focus:ring-emerald-500 focus:border-emerald-500"
                  rows="4"
                />
              </div>
            </div>

            {/* FAQs */}
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-sky-800">FAQs</h2>
              {faqFields.map((item, index) => (
                <div key={item.id} className="border p-4 rounded-md relative">
                  <button
                    type="button"
                    onClick={() => removeFaq(index)}
                    className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                  >
                    <Trash className="h-4 w-4" />
                  </button>
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Question
                      </label>
                      <input
                        {...register(`faqs.${index}.question`, {
                          required: "Question is required",
                        })}
                        className={`w-full p-3 border rounded-md ${
                          errors.faqs?.[index]?.question
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                      />
                      {errors.faqs?.[index]?.question && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.faqs[index].question.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Answer
                      </label>
                      <textarea
                        {...register(`faqs.${index}.answer`, {
                          required: "Answer is required",
                        })}
                        className={`w-full p-3 border rounded-md ${
                          errors.faqs?.[index]?.answer
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                        rows="3"
                      />
                      {errors.faqs?.[index]?.answer && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.faqs[index].answer.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={() => appendFaq({ question: "", answer: "" })}
                className="text-sky-600 hover:underline"
              >
                + Add FAQ
              </button>
            </div>

            {/* Testimonials */}
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-sky-800">
                Testimonials
              </h2>
              {testimonialFields.map((item, index) => (
                <div key={item.id} className="border p-4 rounded-md relative">
                  <button
                    type="button"
                    onClick={() => removeTestimonial(index)}
                    className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                  >
                    <Trash className="h-4 w-4" />
                  </button>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Name
                      </label>
                      <input
                        {...register(`testimonials.${index}.name`, {
                          required: "Name is required",
                        })}
                        className={`w-full p-3 border rounded-md ${
                          errors.testimonials?.[index]?.name
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                      />
                      {errors.testimonials?.[index]?.name && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.testimonials[index].name.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Country
                      </label>
                      <input
                        {...register(`testimonials.${index}.country`)}
                        className="w-full p-3 border rounded-md border-gray-300"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Comment
                      </label>
                      <textarea
                        {...register(`testimonials.${index}.comment`, {
                          required: "Comment is required",
                        })}
                        className={`w-full p-3 border rounded-md ${
                          errors.testimonials?.[index]?.comment
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                        rows="3"
                      />
                      {errors.testimonials?.[index]?.comment && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.testimonials[index].comment.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Rating (0-5)
                      </label>
                      <input
                        type="number"
                        {...register(`testimonials.${index}.rating`, {
                          required: "Rating is required",
                          min: {
                            value: 0,
                            message: "Rating must be between 0 and 5",
                          },
                          max: {
                            value: 5,
                            message: "Rating must be between 0 and 5",
                          },
                        })}
                        className={`w-full p-3 border rounded-md ${
                          errors.testimonials?.[index]?.rating
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                        min="0"
                        max="5"
                      />
                      {errors.testimonials?.[index]?.rating && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.testimonials[index].rating.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={() =>
                  appendTestimonial({
                    name: "",
                    country: "",
                    comment: "",
                    rating: "",
                  })
                }
                className="text-sky-600 hover:underline"
              >
                + Add Testimonial
              </button>
            </div>

            {/* Rating and Reviews */}
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-sky-800">
                Rating & Reviews
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="rating"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Rating (0-5)
                  </label>
                  <input
                    id="rating"
                    type="number"
                    {...register("rating", {
                      min: {
                        value: 0,
                        message: "Rating must be between 0 and 5",
                      },
                      max: {
                        value: 5,
                        message: "Rating must be between 0 and 5",
                      },
                    })}
                    className={`w-full p-3 border rounded-md ${
                      errors.rating ? "border-red-500" : "border-gray-300"
                    }`}
                    min="0"
                    max="5"
                  />
                  {errors.rating && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.rating.message}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="reviews"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Number of Reviews
                  </label>
                  <input
                    id="reviews"
                    type="number"
                    {...register("reviews", {
                      min: { value: 0, message: "Reviews must be positive" },
                    })}
                    className={`w-full p-3 border rounded-md ${
                      errors.reviews ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.reviews && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.reviews.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={handleCancel}
                className="px-6 py-3 border rounded-md text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-emerald-500 text-white rounded-md hover:bg-emerald-600 flex items-center gap-2"
              >
                <Save className="h-5 w-5" />
                {isEditMode ? "Update Trek" : "Add Trek"}
              </button>
            </div>
          </form>

          {/* Cancel Confirmation Dialog */}
          {showCancelConfirm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                <h3 className="text-lg font-semibold text-sky-800">
                  Confirm Cancel
                </h3>
                <p className="text-gray-600 mt-2">
                  Are you sure you want to cancel? All unsaved changes will be
                  lost.
                </p>
                <div className="flex justify-end gap-4 mt-6">
                  <button
                    onClick={() => setShowCancelConfirm(false)}
                    className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-100"
                  >
                    Stay
                  </button>
                  <Link
                    to="/admin/trekking"
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                  >
                    Confirm Cancel
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
