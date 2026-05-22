export default function Loading() {
  return (
    <div className="min-h-[50vh] flex flex-col justify-center items-center gap-4">
      <div className="relative h-14 w-14">
        <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-pink-500 border-r-fuchsia-500" />
        <div className="absolute inset-2 animate-spin rounded-full border-4 border-transparent border-b-violet-500 border-l-pink-400" style={{ animationDirection: "reverse", animationDuration: "0.8s" }} />
      </div>
      <p className="text-sm font-bold bg-gradient-to-r from-pink-500 via-fuchsia-500 to-violet-500 bg-clip-text text-transparent animate-pulse">
        Loading FurEverFriends...
      </p>
    </div>
  );
}