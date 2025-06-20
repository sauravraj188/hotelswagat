import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar as CalendarIcon, Search, User } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

export interface SearchParams {
  checkIn?: string;
  checkOut?: string;
  guests: number;
  roomType?: string;
}

interface SearchFormProps {
  onSearch: (params: SearchParams) => void;
  loading: boolean;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch, loading }) => {
  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();
  const [guests, setGuests] = useState('2');
  const [roomType, setRoomType] = useState('any'); // default 'any'

  useEffect(() => {
    if (checkIn && checkOut && checkOut <= checkIn) {
      setCheckOut(undefined);
    }
  }, [checkIn]);

  const handleSearch = () => {
    if (checkIn && !checkOut) {
      alert('Please select a check-out date after check-in.');
      return;
    }
    if (checkOut && !checkIn) {
      alert('Please select a check-in date.');
      return;
    }
    if (checkIn && checkOut && checkOut <= checkIn) {
      alert('Check-out must be after check-in.');
      return;
    }
    onSearch({
      checkIn: checkIn ? format(checkIn, 'yyyy-MM-dd') : undefined,
      checkOut: checkOut ? format(checkOut, 'yyyy-MM-dd') : undefined,
      guests: Number(guests),
      roomType: roomType !== 'any' ? roomType : undefined,
    });
  };

  const isSearchDisabled =
    loading ||
    Boolean(checkIn && (!checkOut || (checkOut && checkOut <= checkIn)));

  return (
    <Card className="p-6 bg-white/95 backdrop-blur-sm shadow-lg animate-scale-in">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Check-in */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Check-in</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !checkIn && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {checkIn ? format(checkIn, "PPP") : <span>Select date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={checkIn}
                onSelect={setCheckIn}
                disabled={(date) => {
                  const today = new Date(); today.setHours(0,0,0,0);
                  return date < today;
                }}
                initialFocus
                className="pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Check-out */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Check-out</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !checkOut && "text-muted-foreground"
                )}
                disabled={!checkIn}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {checkOut ? format(checkOut, "PPP") : <span>Select date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={checkOut}
                onSelect={setCheckOut}
                disabled={(date) => {
                  const today = new Date(); today.setHours(0,0,0,0);
                  if (date < today) return true;
                  if (checkIn && date <= checkIn) return true;
                  return false;
                }}
                initialFocus
                className="pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Guests */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Guests</label>
          <Select value={guests} onValueChange={setGuests}>
            <SelectTrigger>
              <div className="flex items-center">
                <User className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Select guests" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1 Guest</SelectItem>
              <SelectItem value="2">2 Guests</SelectItem>
              <SelectItem value="3">3 Guests</SelectItem>
              <SelectItem value="4">4 Guests</SelectItem>
              <SelectItem value="5">5+ Guests</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Room Type */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Room Type</label>
          <Select value={roomType} onValueChange={setRoomType}>
            <SelectTrigger>
              <SelectValue placeholder="Any room type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any Room Type</SelectItem>
              <SelectItem value="standard">Standard Room</SelectItem>
              <SelectItem value="deluxe">Deluxe Room</SelectItem>
              <SelectItem value="suite">Suite</SelectItem>
              <SelectItem value="family">Family Room</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Search Button */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-transparent">Search</label>
          <Button
            onClick={handleSearch}
            className="w-full bg-primary hover:bg-primary/90"
            disabled={isSearchDisabled}
          >
            {loading ? 'Searching…' : (
              <>
                <Search className="mr-2 h-4 w-4" />
                Search Rooms
              </>
            )}
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default SearchForm;
