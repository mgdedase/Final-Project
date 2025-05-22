"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

import Map, { Marker } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";

// ✅ Zod schema
const schema = z.object({
  firstName: z.string().min(2, "First name is too short"),
  lastName: z.string().min(2, "Last name is too short"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(10, "Phone number is required"),
  address: z.string().min(5, "Address is required"),
});

type FormData = z.infer<typeof schema>;

export default function RegisterPage() {
  const router = useRouter();
  const [lat, setLat] = useState(14.5995); // Manila
  const [lng, setLng] = useState(120.9842);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    const fullData = { ...data, lat, lng };
    console.log("Registered:", fullData);
    alert("Registration successful!");
    router.push("/");
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-200">
      <Card className="w-full max-w-xl shadow-2xl border border-blue-300">
        <CardContent className="p-8 space-y-6">
          <h1 className="text-xl font-bold text-center text-blue-700 mb-10">
            Create Account
          </h1>


          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1 mb-3">
                <Label htmlFor="firstName" className="text-black">First Name</Label>
                <Input id="firstName" {...register("firstName")} placeholder="Juan" />
                {errors.firstName && <p className="text-sm text-red-500">{errors.firstName.message}</p>}
              </div>

              <div className="space-y-1 mb-3">
                <Label htmlFor="lastName" className="text-black">Last Name</Label>
                <Input id="lastName" {...register("lastName")} placeholder="Dela Cruz" />
                {errors.lastName && <p className="text-sm text-red-500">{errors.lastName.message}</p>}
              </div>
            </div>

            <div className="space-y-1 mb-3">
              <Label htmlFor="email" className="text-black">Email</Label>
              <Input id="email" type="email" {...register("email")} placeholder="you@example.com" />
              {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
            </div>

            <div className="space-y-1 mb-3">
              <Label htmlFor="phone" className="text-black">Phone Number</Label>
              <Input id="phone" type="tel" {...register("phone")} placeholder="09XXXXXXXXX" />
              {errors.phone && <p className="text-sm text-red-500">{errors.phone.message}</p>}
            </div>

            <div className="space-y-1 mb-3">
              <Label htmlFor="address" className="text-black">Full Address</Label>
              <Input id="address" {...register("address")} placeholder="123 Main St, City" />
              {errors.address && <p className="text-sm text-red-500">{errors.address.message}</p>}
            </div>

            {/* 📍 Map Picker */}
            <div className="space-y-2">
              <Label className="text-black">Pin your location</Label>
              <div className="h-64 w-full border rounded">
                <Map
                  initialViewState={{
                    longitude: lng,
                    latitude: lat,
                    zoom: 12,
                  }}
                  mapStyle={`https://api.maptiler.com/maps/basic-v2/style.json?key=99LFAt8SvZRZqeUIvK8D`}
                  style={{ width: "100%", height: "100%" }}
                  onClick={(e) => {
                    setLat(e.lngLat.lat);
                    setLng(e.lngLat.lng);
                  }}
                >
                  <Marker longitude={lng} latitude={lat} />
                </Map>
              </div>
              <p className="text-sm text-gray-500">
                Lat: {lat.toFixed(5)} | Lng: {lng.toFixed(5)}
              </p>
            </div>

            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
              Register
            </Button>
          </form>

          <p className="text-sm text-center text-gray-600">
            Already have an account?{" "}
            <Link href="/" className="text-blue-700 hover:underline font-medium">
              Back to Login
            </Link>
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
