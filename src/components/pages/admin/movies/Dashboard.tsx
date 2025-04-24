/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";
import { useGetMoviesQuery } from "@/core/services/movies-admin/queries/useGetMoviesQuery";
import { useDeleteMovieMutation } from "@/core/services/movies-admin/mutations/useDeleteMovieMutation";
import { Movies } from "../../dashboard/children/MovieList";
import AdminMoviesBanner from "./Banner";
import { WebTable } from "@/components/common/table/Table";
import EditMovieModal from "./UpdateMovieModal";
import { useUpdateMovieMutation } from "@/core/services/movies-admin/mutations/useUpdateMovieMutation";

export default function AdminMoviesDashboard() {
  const navigate = useNavigate();
  const { data: movies = [], isLoading } = useGetMoviesQuery();
  const deleteMutation = useDeleteMovieMutation();
  const [selectedMovie, setSelectedMovie] = useState<Movies | null>(null);
  const updateMovieMutation = useUpdateMovieMutation();
  const columns: ColumnDef<Movies>[] = [
    {
      accessorKey: "movieTitle",
      header: "Title",
    },
    {
      accessorKey: "movieDescription",
      header: "Description",
    },
    {
      accessorKey: "rating",
      header: "Rating",
    },
  ];

  return (
    <div>
      <AdminMoviesBanner />
      <div className="mx-4 md:mx-28 my-8">
        <div className="flex justify-between items-center mt-2">
          <h3 className="text-md font-bold">Movies List</h3>
          <Button
            onClick={() => navigate({ to: "/admin/movies" })}
            className="rounded-full bg-blue-700 text-white"
          >
            + Add a movie
          </Button>
        </div>

        <WebTable
          searchKey="movieTitle"
          columns={columns}
          data={movies}
          isLoading={isLoading}
          emptyMessage={
            <div className="h-96 content-center">
              <h1>No movies found</h1>
              <p>Please add a movie to the list</p>
            </div>
          }
          actions={(row) => (
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="rounded-full"
                onClick={() => setSelectedMovie(row)}
              >
                Update
              </Button>
              <Button
                className="rounded-full bg-red-600 text-white"
                variant="destructive"
                onClick={() => deleteMutation.mutate(row.id)}
              >
                Delete
              </Button>
            </div>
          )}
        />
      </div>

      {selectedMovie && (
        <EditMovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
          onSave={(updatedMovie) => {
            const cleanedData = Object.fromEntries(
              Object.entries(updatedMovie).filter(
                ([_, value]) => value !== undefined && value !== null
              )
            );
            updateMovieMutation.mutate(
              { match: { id: selectedMovie.id }, ...cleanedData },
              {
                onSuccess: () => {
                  setSelectedMovie(null);
                },
              }
            );
          }}
        />
      )}
    </div>
  );
}
