import { getCompanion } from "@/lib/actions/companion.action";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getSubjectColor } from "@/lib/utils";
import Image from "next/image";
import CompanionComponent from "@/components/CompanionComponent";

export const dynamic = "force-dynamic";

interface CompanionSessionPageProps {
  params: { id: string };
}

const CompanionSession = async ({ params }: CompanionSessionPageProps) => {
  const { id } = params;
  const companion = await getCompanion(id);
  const user = await currentUser();

  if (!user) redirect("/sign-in");

  if (!companion) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center">
        <p className="text-lg font-medium">
          This companion could not be loaded. Please check that it exists in Supabase and try again.
        </p>
      </main>
    );
  }

  const { name, subject, title, topic, duration } = companion;

  return (
    <main>
      <article className="flex rounded-border justify-between p-6 max-md:flex-col">
        <div className="flex items-center gap-2">
          <div
            className="size-[72px] flex items-center justify-center rounded-lg max-md:hidden"
            style={{ backgroundColor: getSubjectColor(subject) }}
          >
            <Image src={`/icons/${subject}.svg`} alt={subject} width={35} height={35} />
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <p className="font-bold text-2xl">{name}</p>
              <div className="subject-badge max-sm:hidden">{subject}</div>
            </div>
            <p className="text-lg">{topic}</p>
          </div>
        </div>
        <div className="items-start text-2xl max-md:hidden">{duration} minutes</div>
      </article>

      <CompanionComponent
        {...companion}
        companionId={id}
        userName={user.firstName!}
        userImage={user.imageUrl!}
      />
    </main>
  );
};

export default CompanionSession