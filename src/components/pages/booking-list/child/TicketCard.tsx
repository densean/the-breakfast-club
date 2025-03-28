import JsBarcode from "jsbarcode";
import { useEffect } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { WebButton } from "@/components/common/button/Button";
import "./TicketCard.less";

interface TicketCardProps {
  seatId: string;
  movieTitle: string;
  movieDescription: string;
  movieImgSrc: string;
  showTime: string;
  dateOfBooking: string;
  onCancel: () => void;
  isRemoving: boolean;
  onUpdate: () => void;
  isUpdating: boolean;
}

export default function TicketCard({
  seatId,
  movieTitle,
  movieDescription,
  movieImgSrc,
  showTime,
  dateOfBooking,
  onCancel,
  isRemoving,
  onUpdate,
  isUpdating,
}: TicketCardProps) {
  useEffect(() => {
    const barcodeData = `${movieTitle}-${showTime}`;
    JsBarcode(`#barcode-${seatId}`, barcodeData, {
      format: "CODE128",
      displayValue: false,
      width: 2,
      height: 80,
      margin: 0,
      background: "#fff",
    });
  }, [seatId, movieTitle, showTime]);

  return (
    <div className="ticket-card bg-white py-0 rounded-lg relative flex flex-col items-center md:w-80 sm:w-64 mx-auto ">
      <div className="corner corner-top-right"></div>
      <div className="corner corner-bottom-left"></div>
      <div className="flex flex-col flex-grow items-center w-full">
        <img
          src={movieImgSrc}
          alt={movieTitle}
          className="w-full h-72 object-cover rounded-t-lg"
        />
        <div className="p-5 w-full text-center">
          <h3 className="text-sm font-bold">{movieTitle}</h3>
          <p className="text-black text-xs mt-1">{movieDescription}</p>
        </div>
        <div className="flex justify-between w-full px-4">
          <div className="text-left">
            <p className="text-black text-sm">Date of Booking:</p>
            <p className="font-semibold">{dateOfBooking}</p>
          </div>
          <div className="text-right">
            <p className="text-black text-sm">Seat No:</p>
            <p className="font-semibold">{seatId}</p>
          </div>
        </div>
      </div>

      {/* <div className="w-full p-4">
        <QRCodeCanvas
          value={qrData}
          size={100}
          bgColor="#fff"
          fgColor="#000"
          className="w-full h-full"
        />
      </div> */}

      <div className="mt-auto w-full">
        <svg id={`barcode-${seatId}`} className="w-full"></svg>

        <WebButton
          variant="solid"
          color="blue"
          onClick={onUpdate}
          disabled={isUpdating}
          className="w-full"
          size="3"
          radius="none"
          label={isUpdating ? "Updating..." : "Update Booking"}
        />

        <WebButton
          variant="solid"
          color="red"
          onClick={onCancel}
          disabled={isRemoving}
          className="w-full"
          size="3"
          radius="none"
          label={isRemoving ? "Removing..." : "Cancel Booking"}
        />
      </div>
    </div>
  );
}
