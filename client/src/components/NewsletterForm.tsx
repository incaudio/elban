import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertSubscriberSchema, type InsertSubscriber } from "@shared/schema";
import { useCreateSubscriber } from "@/hooks/use-subscribers";
import { motion } from "framer-motion";
import { Loader2, ArrowRight } from "lucide-react";

export function NewsletterForm() {
  const { mutate, isPending } = useCreateSubscriber();
  const form = useForm<InsertSubscriber>({
    resolver: zodResolver(insertSubscriberSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (data: InsertSubscriber) => {
    mutate(data, {
      onSuccess: () => form.reset(),
    });
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-md mx-auto relative group">
      <div className="relative flex items-center border-b border-white/20 focus-within:border-white transition-colors duration-300 pb-2">
        <input
          {...form.register("email")}
          type="email"
          placeholder="ENTER YOUR EMAIL"
          disabled={isPending}
          className="w-full bg-transparent border-none text-xl md:text-2xl font-display uppercase tracking-wider placeholder:text-white/20 focus:outline-none focus:ring-0 px-0 py-2"
        />
        <button
          type="submit"
          disabled={isPending}
          className="ml-4 p-2 text-white/50 hover:text-white transition-colors disabled:opacity-50"
        >
          {isPending ? (
            <Loader2 className="w-6 h-6 animate-spin" />
          ) : (
            <ArrowRight className="w-6 h-6 group-focus-within:translate-x-1 transition-transform" />
          )}
        </button>
      </div>
      {form.formState.errors.email && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute mt-2 text-sm text-red-500 font-mono"
        >
          {form.formState.errors.email.message}
        </motion.p>
      )}
    </form>
  );
}
