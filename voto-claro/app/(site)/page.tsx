import { Calendar } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { VotingLocation, CandidatesGrid } from '@/components/home';
import NewsList from '@/presentation/(site)/newsList';

export default function HomePage() {

  return (
    <>
      <main className="max-w-md lg:max-w-7xl mx-auto px-4 lg:px-8 py-6 space-y-6 pb-20 lg:pb-6">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8 lg:space-y-0 space-y-6">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-8 space-y-6">
            {/*Noticias*/}
            <NewsList />
            {/* Conoce a tus Candidatos */}
            <section>
              <CandidatesGrid />
            </section>
          </div>

          {/* Right Column - Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            {/* Mi Local de Votación */}
            <section>
              <VotingLocation />
            </section>

            {/* Calendario Electoral */}
            <section>
              <Card>
                <CardContent className="p-4 lg:p-6">
                  <div className="w-full h-32 lg:h-40 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg mb-4 flex items-center justify-center">
                    <Calendar className="w-12 h-12 lg:w-16 lg:h-16 text-yellow-600 dark:text-yellow-400" />
                  </div>
                  
                  <h3 className="font-semibold text-card-foreground mb-2 text-base lg:text-lg">Calendario Electoral</h3>
                  <p className="text-sm lg:text-base text-muted-foreground">No te pierdas las fechas importantes</p>
                </CardContent>
              </Card>
            </section>

            {/* Soy Miembro de Mesa */}
            <section>
              <Card>
                <CardContent className="p-4 lg:p-6">
                  <div className="w-full h-32 lg:h-40 bg-muted rounded-lg mb-4 overflow-hidden flex items-center justify-center">
                    <span className="text-muted-foreground text-sm">Capacitación</span>
                  </div>                  <h3 className="font-semibold text-card-foreground mb-2 text-base lg:text-lg">Soy Miembro de Mesa</h3>
                  <p className="text-sm lg:text-base text-muted-foreground">Capacitación y materiales</p>
                </CardContent>
              </Card>
            </section>
          </div>
        </div>
      </main>
    </>
  );}
