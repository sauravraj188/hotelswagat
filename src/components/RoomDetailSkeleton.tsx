
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';

const RoomDetailsSkeleton = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Left Column - Images and Details */}
      <div className="lg:col-span-2">
        {/* Image Gallery Skeleton */}
        <div className="relative mb-6">
          <Skeleton className="aspect-video rounded-lg" />
          <div className="flex gap-2 mt-4 overflow-x-auto">
            {[...Array(5)].map((_, index) => (
              <Skeleton key={index} className="w-20 h-16 rounded" />
            ))}
          </div>
        </div>

        {/* Room Info Skeleton */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <Skeleton className="h-8 w-48" />
              <div className="flex items-center space-x-1">
                <Skeleton className="h-5 w-5 rounded-full" />
                <Skeleton className="h-5 w-16" />
                <Skeleton className="h-5 w-20" />
              </div>
            </div>
            <Skeleton className="h-6 w-20 rounded-full" />
          </div>

          <Skeleton className="h-6 w-full" />

          {/* Room Specs Skeleton */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Skeleton className="w-5 h-5" />
                <Skeleton className="h-4 w-20" />
              </div>
            ))}
          </div>

          {/* Amenities Skeleton */}
          <div>
            <Skeleton className="h-6 w-32 mb-4" />
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {[...Array(8)].map((_, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Skeleton className="w-2 h-2 rounded-full" />
                  <Skeleton className="h-4 w-24" />
                </div>
              ))}
            </div>
          </div>

          {/* Policies Skeleton */}
          <div>
            <Skeleton className="h-6 w-28 mb-4" />
            <div className="space-y-2">
              {[...Array(5)].map((_, index) => (
                <Skeleton key={index} className="h-4 w-full" />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right Column - Booking Widget Skeleton */}
      <div className="lg:col-span-1">
        <Card className="sticky top-4">
          <CardContent className="p-6">
            <div className="text-center mb-6">
              <Skeleton className="h-8 w-24 mx-auto mb-2" />
              <Skeleton className="h-4 w-16 mx-auto" />
            </div>

            <div className="space-y-4">
              <div>
                <Skeleton className="h-4 w-16 mb-2" />
                <Skeleton className="h-12 w-full" />
              </div>

              <div>
                <Skeleton className="h-4 w-18 mb-2" />
                <Skeleton className="h-12 w-full" />
              </div>

              <div>
                <Skeleton className="h-4 w-12 mb-2" />
                <Skeleton className="h-12 w-full" />
              </div>

              <Skeleton className="h-12 w-full" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
  export default RoomDetailsSkeleton;