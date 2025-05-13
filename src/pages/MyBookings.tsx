import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import DigitalTicket from '@/components/DigitalTicket';
import { Dialog, DialogContent } from '@/components/ui/dialog';
// @ts-ignore
import html2pdf from 'html2pdf.js';
import { UserCircle } from 'lucide-react';

interface Booking {
  id: number;
  trip_title: string;
  booking_date: string;
  status: string;
}

const statusColors: Record<string, string> = {
  Confirmed: 'bg-green-100 text-green-800',
  Pending: 'bg-yellow-100 text-yellow-800',
  Cancelled: 'bg-red-100 text-red-800',
};

const MyBookings: React.FC = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchBookings = async () => {
      if (!user) return;
      setLoading(true);
      setError('');
      const { data, error } = await supabase
        .from('bookings')
        .select('id, trip_title, booking_date, status')
        .eq('user_id', user.id)
        .order('booking_date', { ascending: false });
      if (error) setError(error.message);
      else setBookings(data || []);
      setLoading(false);
    };
    fetchBookings();
  }, [user]);

  const handleViewDetails = (booking: Booking) => {
    setSelectedBooking(booking);
    setModalOpen(true);
  };

  const handleDownloadPDF = () => {
    const ticketElement = document.getElementById('digital-ticket-pdf');
    if (ticketElement) {
      html2pdf().set({ margin: 0, filename: 'BharatYatra-Ticket.pdf', html2canvas: { scale: 2 }, jsPDF: { format: 'a4', orientation: 'portrait' } }).from(ticketElement).save();
    }
  };

  if (!user) return <div className="mt-20 text-center">Please log in to view your bookings.</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-2 sm:px-0">
      <div className="max-w-2xl mx-auto">
        <div className="flex flex-col items-center mb-10">
          <div className="flex items-center gap-3">
            <img 
              src="/logo.svg" 
              alt="Mo Yatra" 
              className="h-12 w-12 rounded-full bg-white border shadow-sm object-contain"
              onError={e => {
                const target = e.target as HTMLImageElement;
                target.onerror = null;
                target.style.display = 'none';
                target.parentElement?.insertAdjacentHTML('beforeend', `<span class='inline-flex items-center gap-1 text-3xl font-bold text-bharat-orange'>Mo</span>`);
              }}
            />
          </div>
          <h2 className="text-3xl font-extrabold text-bharat-orange mt-2 tracking-tight text-center drop-shadow-sm">My Bookings</h2>
        </div>
        {loading && <p className="text-center text-gray-500">Loading...</p>}
        {error && <p className="text-center text-red-600">{error}</p>}
        {!loading && bookings.length === 0 && <p className="text-center text-gray-400">No bookings found.</p>}
        <div className="space-y-6">
          {bookings.map(b => (
            <div
              key={b.id}
              className="bg-white rounded-xl shadow-md border border-gray-100 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-transform hover:scale-[1.02] hover:shadow-lg duration-200"
            >
              <div>
                <div className="font-bold text-xl text-bharat-orange mb-1">{b.trip_title}</div>
                <div className="text-gray-500 text-sm mb-2">{new Date(b.booking_date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</div>
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold shadow-sm ${statusColors[b.status] || 'bg-gray-100 text-gray-800'} ${b.status === 'Confirmed' ? 'ring-2 ring-green-200' : b.status === 'Pending' ? 'ring-2 ring-yellow-200' : b.status === 'Cancelled' ? 'ring-2 ring-red-200' : ''}`}>{b.status}</span>
              </div>
              <button
                onClick={() => handleViewDetails(b)}
                className="text-blue-600 underline text-sm font-semibold mt-2 sm:mt-0 hover:text-blue-800 transition-colors"
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="max-w-lg w-full">
          {selectedBooking && (
            <div>
              <div id="digital-ticket-pdf">
                {/* You may need to fetch more details for the ticket if needed */}
                <DigitalTicket booking={{
                  passengers: [{ name: user?.user_metadata?.name || user?.email || '', age: 'N/A' }],
                  contact: user?.email || '',
                  tourTitle: selectedBooking.trip_title,
                  startDate: selectedBooking.booking_date,
                  ex: 'N/A',
                  busType: 'N/A',
                }} />
              </div>
              <button onClick={handleDownloadPDF} className="mt-4 w-full bg-bharat-orange text-white py-2 rounded font-semibold hover:bg-bharat-orange/90 transition-colors">Download E-Ticket (PDF)</button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MyBookings; 