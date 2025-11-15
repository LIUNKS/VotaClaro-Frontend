import { AlertCircle, RefreshCw } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface NewsErrorProps {
  error: string;
  onRetry?: () => void;
  isRetrying?: boolean;
}

export function NewsError({ error, onRetry, isRetrying = false }: NewsErrorProps) {
  return (
    <Card className="border-destructive/50">
      <CardContent className="p-4 lg:p-6">
        <div className="flex flex-col items-center text-center space-y-4">
          <AlertCircle className="w-12 h-12 text-destructive" />
          
          <div className="space-y-2">
            <h3 className="font-semibold text-foreground">
              Error al cargar noticias
            </h3>
            <p className="text-sm text-muted-foreground">
              {error}
            </p>
          </div>
          
          {onRetry && (
            <Button 
              variant="outline" 
              onClick={onRetry}
              disabled={isRetrying}
              className="min-w-[120px]"
            >
              {isRetrying ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Cargando...
                </>
              ) : (
                <>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Reintentar
                </>
              )}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}