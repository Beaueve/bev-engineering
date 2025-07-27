interface ActorProps {
  name?: string;
}

export default function Actor({ name } : ActorProps) {
  return (
    <div className={`group`}>
      <div className="relative bg-black bg-opacity-50 border border-pink-500 rounded-2xl p-4 text-white hover:scale-105 transition">
        {/* <img src={icon} alt={name} className="w-12 h-12 mb-2" /> */}

        <p className="text-sm font-bold text-center">{name}</p>
      </div>

    </div>
  );
}
