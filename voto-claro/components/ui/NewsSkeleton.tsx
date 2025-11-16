import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

interface NewsSkeletonProps {
  count?: number;
}

export function NewsSkeleton({ count = 2 }: NewsSkeletonProps) {
	return (
		<div className="space-y-4 lg:grid lg:grid-cols-2 lg:gap-6 lg:space-y-0">
			{Array.from({ length: count }).map((_, index) => (
				<Card key={index} className="overflow-hidden">
					<CardContent className="p-4 lg:p-6">
						<div className="space-y-3">
							<Skeleton className="w-full h-32 lg:h-40 rounded-lg" />
              
							<div className="space-y-2">
								<Skeleton className="h-5 w-full" />
								<Skeleton className="h-5 w-3/4" />
							</div>
              
							<div className="space-y-1">
								<Skeleton className="h-4 w-full" />
								<Skeleton className="h-4 w-2/3" />
							</div>
						</div>
					</CardContent>
				</Card>
			))}
		</div>
	);
}