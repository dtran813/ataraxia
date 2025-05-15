import { MainLayout } from "@/components/layout/MainLayout";

export default function AboutPage() {
  return (
    <MainLayout>
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-6">About Ataraxia</h1>

        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p>
            Ataraxia is a web application designed to enhance productivity and
            wellbeing through customizable focus environments and smart breaks.
            The app combines visual and audio elements to create immersive work
            environments while encouraging healthy work habits through timed
            breaks.
          </p>

          <h2>Our Mission</h2>
          <p>
            Our mission is to help knowledge workers and creative professionals
            find their optimal state of flow while maintaining a healthy
            work-life balance. We believe that the right environment can
            significantly impact productivity, creativity, and overall
            wellbeing.
          </p>

          <h2>Key Features</h2>
          <ul>
            <li>
              <strong>Productivity Timer:</strong> Customizable Pomodoro-style
              timer to structure your work and break sessions.
            </li>
            <li>
              <strong>Focus Environments:</strong> Beautiful visual backgrounds
              paired with ambient audio to create the perfect atmosphere for
              deep work.
            </li>
            <li>
              <strong>Break Activities:</strong> Guided stretches, breathing
              exercises, and mindfulness prompts to make your breaks more
              effective.
            </li>
            <li>
              <strong>Analytics Dashboard:</strong> Track your productivity
              habits and focus trends with detailed analytics.
            </li>
          </ul>

          <h2>Our Approach</h2>
          <p>
            Ataraxia is built on principles from cognitive psychology,
            productivity research, and user-centered design. We focus on
            creating an experience that adapts to your unique work style and
            preferences, rather than forcing you into rigid systems.
          </p>

          <p>
            The name &quot;Ataraxia&quot; comes from ancient Greek philosophy,
            referring to a state of tranquility and freedom from distress. We
            believe this state is achievable even in today&apos;s fast-paced,
            distraction-filled work environments.
          </p>
        </div>
      </div>
    </MainLayout>
  );
}
