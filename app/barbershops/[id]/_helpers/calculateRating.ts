import { Ratings } from "@prisma/client";

export const calculateRatingBarbershops = (ratings: Ratings[]) => {
   if (ratings.length === 0) {
     return 0;
   }

   const sum = ratings.reduce((acc, rating) => acc + rating.rating, 0);
   const average = sum / ratings.length;

   // Round to the nearest half-star (e.g., 4.1 -> 4.5, 4.6 -> 5.0)
   const weightedAverage = Math.round(average * 2) / 2;

   return weightedAverage;
 };