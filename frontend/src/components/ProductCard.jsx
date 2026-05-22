import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const WhatsAppSVG = ({ size = 16 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.978-1.417A9.953 9.953 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8.5 9.5c.167.833.9 2.7 2.5 3.5s2.667 1.333 3 1.5c.167.083.6.1 1-.5.5-.7.667-.933.667-.933s1.333.667 2 1c.133.067.4.4 0 1-.5.767-1.467 1.933-2.667 1.933-1.2 0-3.333-.933-5.333-3.167C7.667 11.6 7.167 9.433 7.5 8.5c.267-.733 1.067-1.333 1.5-1.5.5-.2.867-.033 1 .167.133.2.5 1.167.5 1.333z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

function ProductCard({ product }) {
  const navigate = useNavigate();

  const title = product?.name || product?.product_title || 'Premium Product';
  const imgSrc = product?.image || product?.img_src || '';
  const category = product?.category || 'Kitchenware';
  const price = product?.price;
  const description = product?.description;
  const productId = product?.id || product?._id;

  const handleCardClick = () => {
    if (productId) {
      navigate(`/product/${productId}`);
    }
  };

  const handleWhatsAppClick = (e) => {
    e.stopPropagation();
    const message = encodeURIComponent(
      `Hello NC Nandini Collections! I'm interested in: ${title}`
    );
    window.open(`https://wa.me/?text=${message}`, '_blank');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      whileHover={{ y: -6, boxShadow: '0 20px 60px rgba(212,175,55,0.18)' }}
      onClick={handleCardClick}
      className="group bg-white rounded-[24px] border border-[#f0e8d4] p-6 flex flex-col items-start cursor-pointer shadow-[0_6px_24px_rgba(59,28,3,0.07)] hover:border-[#D4AF37]/40 transition-colors duration-300"
    >
      <div className="w-full aspect-[4/3] rounded-xl overflow-hidden mb-5 bg-[#faf7f2]">
        <motion.img
          src={imgSrc}
          alt={title}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.04 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          onError={(e) => {
            e.currentTarget.src = 'https://placehold.co/400x300/faf7f2/c8a96e?text=NC+Nandini';
          }}
        />
      </div>

      <div className="flex flex-col items-start w-full gap-3">
        <span className="inline-block px-3 py-1 rounded-full bg-[#faf3e0] text-[10px] font-semibold text-[#c8a030] tracking-widest uppercase font-raleway">
          {category}
        </span>

        <h3 className="font-playfair font-bold text-[1.15rem] leading-snug text-[#3b1c03] group-hover:text-[#D4AF37] transition-colors duration-300">
          {title}
        </h3>

        {description && (
          <p className="text-sm text-[#3b1c03]/55 leading-relaxed line-clamp-2 font-raleway">
            {description}
          </p>
        )}

        <div className="w-full h-px bg-gradient-to-r from-[#D4AF37]/40 via-[#D4AF37]/20 to-transparent mt-1" />

        {price && (
          <div className="flex items-center gap-2">
            <span className="font-raleway font-semibold text-base text-[#3b1c03]">
              ₹{price}
            </span>
            <span className="inline-block px-2 py-0.5 rounded-full bg-[#D4AF37]/15 text-[10px] font-semibold text-[#D4AF37] tracking-wide uppercase font-raleway">
              Best Price
            </span>
          </div>
        )}

        <motion.button
          onClick={handleWhatsAppClick}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          className="w-full mt-2 flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-full border border-[#3b1c03]/30 bg-white text-[#3b1c03] font-semibold text-sm tracking-wide font-raleway shadow-sm hover:border-[#D4AF37] hover:text-[#D4AF37] hover:shadow-[0_0_16px_rgba(212,175,55,0.18)] transition-all duration-300"
          aria-label={`Inquire about ${title} on WhatsApp`}
        >
          <span className="text-[#D4AF37]">
            <WhatsAppSVG size={16} />
          </span>
          <span>Inquire on WhatsApp</span>
        </motion.button>
      </div>
    </motion.div>
  );
}

export default ProductCard;
